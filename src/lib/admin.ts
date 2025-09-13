import { createSupabaseClient } from './supabase'
import type { User } from '@supabase/supabase-js'

export interface AdminUser {
  id: string
  user_id: string
  role: 'admin' | 'super_admin'
  permissions: string[]
  created_at: string
  updated_at: string
  user: {
    email: string
    name?: string
  }
}

export interface OrderWithDetails {
  id: string
  user_id: string
  file_name: string
  file_url: string
  file_type: string
  file_size: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  total_amount: number
  additional_options: any
  notes?: string
  admin_notes?: string
  tracking_number?: string
  estimated_delivery_date?: string
  created_at: string
  updated_at: string
  user: {
    email: string
    name?: string
    phone?: string
  }
  payments: Array<{
    id: string
    status: string
    method: string
    amount: number
    approved_at: string
  }>
  order_status_history: Array<{
    id: string
    status: string
    comment?: string
    created_at: string
    changed_by?: string
  }>
}

export class AdminService {
  private supabase = createSupabaseClient()

  async checkAdminPermission(userId: string): Promise<{ isAdmin: boolean; adminData?: AdminUser }> {
    try {
      const { data, error } = await this.supabase
        .from('admins')
        .select(`
          *,
          user:users(email, name)
        `)
        .eq('user_id', userId)
        .single()

      if (error || !data) {
        return { isAdmin: false }
      }

      return { 
        isAdmin: true, 
        adminData: {
          ...data,
          user: data.user
        }
      }
    } catch (error) {
      console.error('Admin permission check error:', error)
      return { isAdmin: false }
    }
  }

  async getAllOrders(filters?: {
    status?: string
    dateFrom?: string
    dateTo?: string
    searchTerm?: string
  }): Promise<{ data: OrderWithDetails[] | null; error?: string }> {
    try {
      let query = this.supabase
        .from('orders')
        .select(`
          *,
          user:users(email, name, phone),
          payments(*),
          order_status_history(*)
        `)
        .order('created_at', { ascending: false })

      // Apply filters
      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status)
      }

      if (filters?.dateFrom) {
        query = query.gte('created_at', filters.dateFrom)
      }

      if (filters?.dateTo) {
        query = query.lte('created_at', filters.dateTo)
      }

      if (filters?.searchTerm) {
        query = query.or(`file_name.ilike.%${filters.searchTerm}%,user.email.ilike.%${filters.searchTerm}%`)
      }

      const { data, error } = await query

      if (error) {
        console.error('Orders fetch error:', error)
        return { data: null, error: '주문 목록을 불러오는 중 오류가 발생했습니다.' }
      }

      return { data: data as OrderWithDetails[] }
    } catch (error) {
      console.error('Unexpected orders fetch error:', error)
      return { data: null, error: '예상치 못한 오류가 발생했습니다.' }
    }
  }

  async updateOrderStatus(
    orderId: string, 
    status: 'pending' | 'processing' | 'completed' | 'cancelled',
    adminUserId: string,
    comment?: string,
    trackingNumber?: string,
    estimatedDeliveryDate?: string
  ): Promise<{ error?: string }> {
    try {
      // Update order
      const updateData: any = { 
        status,
        updated_at: new Date().toISOString()
      }

      if (trackingNumber) {
        updateData.tracking_number = trackingNumber
      }

      if (estimatedDeliveryDate) {
        updateData.estimated_delivery_date = estimatedDeliveryDate
      }

      const { error: orderError } = await this.supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)

      if (orderError) {
        console.error('Order update error:', orderError)
        return { error: '주문 상태 업데이트 중 오류가 발생했습니다.' }
      }

      // Add to status history
      const { error: historyError } = await this.supabase
        .from('order_status_history')
        .insert({
          order_id: orderId,
          status,
          comment: comment || this.getStatusComment(status),
          changed_by: adminUserId
        })

      if (historyError) {
        console.error('Status history error:', historyError)
        // Don't return error here as the main update succeeded
      }

      return {}
    } catch (error) {
      console.error('Unexpected order update error:', error)
      return { error: '예상치 못한 오류가 발생했습니다.' }
    }
  }

  async updateOrderNotes(
    orderId: string,
    adminNotes: string,
    adminUserId: string
  ): Promise<{ error?: string }> {
    try {
      const { error } = await this.supabase
        .from('orders')
        .update({
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)

      if (error) {
        console.error('Order notes update error:', error)
        return { error: '관리자 메모 업데이트 중 오류가 발생했습니다.' }
      }

      // Add to status history
      await this.supabase
        .from('order_status_history')
        .insert({
          order_id: orderId,
          status: 'processing', // Current status
          comment: '관리자 메모 업데이트',
          changed_by: adminUserId
        })

      return {}
    } catch (error) {
      console.error('Unexpected notes update error:', error)
      return { error: '예상치 못한 오류가 발생했습니다.' }
    }
  }

  async getOrderStats(): Promise<{
    data: {
      total: number
      pending: number
      processing: number
      completed: number
      cancelled: number
      todayOrders: number
      weekRevenue: number
    } | null
    error?: string
  }> {
    try {
      // Get order counts by status
      const { data: statusCounts, error: statusError } = await this.supabase
        .from('orders')
        .select('status')

      if (statusError) {
        throw statusError
      }

      const stats = {
        total: statusCounts?.length || 0,
        pending: statusCounts?.filter(o => o.status === 'pending').length || 0,
        processing: statusCounts?.filter(o => o.status === 'processing').length || 0,
        completed: statusCounts?.filter(o => o.status === 'completed').length || 0,
        cancelled: statusCounts?.filter(o => o.status === 'cancelled').length || 0,
        todayOrders: 0,
        weekRevenue: 0
      }

      // Get today's orders
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const { data: todayData, error: todayError } = await this.supabase
        .from('orders')
        .select('id')
        .gte('created_at', today.toISOString())

      if (!todayError) {
        stats.todayOrders = todayData?.length || 0
      }

      // Get this week's revenue
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)

      const { data: revenueData, error: revenueError } = await this.supabase
        .from('orders')
        .select('total_amount')
        .eq('status', 'completed')
        .gte('created_at', weekAgo.toISOString())

      if (!revenueError) {
        stats.weekRevenue = revenueData?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0
      }

      return { data: stats }
    } catch (error) {
      console.error('Stats fetch error:', error)
      return { data: null, error: '통계 정보를 불러오는 중 오류가 발생했습니다.' }
    }
  }

  private getStatusComment(status: string): string {
    switch (status) {
      case 'pending':
        return '주문 접수 대기'
      case 'processing':
        return '제작 진행 중'
      case 'completed':
        return '제작 완료 및 배송 완료'
      case 'cancelled':
        return '주문 취소'
      default:
        return '상태 변경'
    }
  }

  async createAdminUser(
    userId: string, 
    role: 'admin' | 'super_admin' = 'admin'
  ): Promise<{ error?: string }> {
    try {
      const { error } = await this.supabase
        .from('admins')
        .insert({
          user_id: userId,
          role,
          permissions: role === 'super_admin' 
            ? ['view_orders', 'update_orders', 'manage_admins', 'view_analytics']
            : ['view_orders', 'update_orders']
        })

      if (error) {
        console.error('Admin creation error:', error)
        return { error: '관리자 계정 생성 중 오류가 발생했습니다.' }
      }

      return {}
    } catch (error) {
      console.error('Unexpected admin creation error:', error)
      return { error: '예상치 못한 오류가 발생했습니다.' }
    }
  }
}

export const adminService = new AdminService()

// Utility functions
export const formatOrderStatus = (status: string): { label: string; color: string } => {
  const statusMap = {
    pending: { label: '결제 대기', color: 'bg-yellow-100 text-yellow-800' },
    processing: { label: '제작 중', color: 'bg-blue-100 text-blue-800' },
    completed: { label: '완료', color: 'bg-green-100 text-green-800' },
    cancelled: { label: '취소', color: 'bg-red-100 text-red-800' },
  }
  
  return statusMap[status as keyof typeof statusMap] || statusMap.pending
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
}
