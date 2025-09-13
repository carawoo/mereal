import { loadTossPayments, TossPayments } from '@tosspayments/payment-sdk'
import { createSupabaseClient } from './supabase'

export interface PaymentData {
  orderId: string
  amount: number
  orderName: string
  customerName: string
  customerEmail: string
  successUrl: string
  failUrl: string
}

export interface PaymentResult {
  paymentKey: string
  orderId: string
  amount: number
}

export class PaymentService {
  private tossPayments: TossPayments | null = null
  private supabase = createSupabaseClient()
  private clientKey: string

  constructor() {
    this.clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || ''
    if (!this.clientKey) {
      console.error('Toss Payments client key is not configured')
    }
  }

  async initialize(): Promise<void> {
    if (!this.clientKey) {
      throw new Error('Toss Payments client key is not configured')
    }

    try {
      this.tossPayments = await loadTossPayments(this.clientKey)
    } catch (error) {
      console.error('Failed to initialize Toss Payments:', error)
      throw error
    }
  }

  async requestPayment(paymentData: PaymentData): Promise<void> {
    if (!this.tossPayments) {
      await this.initialize()
    }

    if (!this.tossPayments) {
      throw new Error('Toss Payments is not initialized')
    }

    try {
      await this.tossPayments.requestPayment('카드', {
        amount: paymentData.amount,
        orderId: paymentData.orderId,
        orderName: paymentData.orderName,
        customerName: paymentData.customerName,
        customerEmail: paymentData.customerEmail,
        successUrl: paymentData.successUrl,
        failUrl: paymentData.failUrl,
      })
    } catch (error) {
      console.error('Payment request failed:', error)
      throw error
    }
  }

  async verifyPayment(paymentKey: string, orderId: string, amount: number): Promise<boolean> {
    try {
      const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
      })

      if (!response.ok) {
        throw new Error('Payment verification failed')
      }

      const result = await response.json()
      return result.success
    } catch (error) {
      console.error('Payment verification error:', error)
      return false
    }
  }

  async createOrder(orderData: {
    userId: string
    fileId: string
    fileName: string
    fileUrl: string
    fileType: string
    fileSize: number
    options: any
    totalAmount: number
  }): Promise<{ orderId: string; error?: string }> {
    try {
      const orderId = `order-${Date.now()}-${Math.random().toString(36).substring(2)}`
      
      const { data, error } = await this.supabase
        .from('orders')
        .insert({
          id: orderId,
          user_id: orderData.userId,
          file_url: orderData.fileUrl,
          file_name: orderData.fileName,
          file_type: orderData.fileType,
          file_size: orderData.fileSize,
          status: 'pending',
          total_amount: orderData.totalAmount,
          base_price: orderData.totalAmount, // Simplified for now
          additional_options: orderData.options,
        })
        .select()
        .single()

      if (error) {
        console.error('Order creation error:', error)
        return { orderId: '', error: '주문 생성 중 오류가 발생했습니다.' }
      }

      return { orderId }
    } catch (error) {
      console.error('Unexpected order creation error:', error)
      return { orderId: '', error: '예상치 못한 오류가 발생했습니다.' }
    }
  }

  async updateOrderPayment(orderId: string, paymentData: {
    paymentKey: string
    amount: number
    status: 'completed' | 'failed'
    method: string
  }): Promise<{ error?: string }> {
    try {
      // Update order status
      const { error: orderError } = await this.supabase
        .from('orders')
        .update({
          status: paymentData.status === 'completed' ? 'processing' : 'cancelled',
        })
        .eq('id', orderId)

      if (orderError) {
        console.error('Order update error:', orderError)
        return { error: '주문 상태 업데이트 중 오류가 발생했습니다.' }
      }

      // Create payment record
      const { error: paymentError } = await this.supabase
        .from('payments')
        .insert({
          order_id: orderId,
          payment_key: paymentData.paymentKey,
          amount: paymentData.amount,
          status: paymentData.status,
          method: paymentData.method,
          approved_at: paymentData.status === 'completed' ? new Date().toISOString() : null,
        })

      if (paymentError) {
        console.error('Payment record error:', paymentError)
        return { error: '결제 정보 저장 중 오류가 발생했습니다.' }
      }

      // Create order status history
      await this.supabase
        .from('order_status_history')
        .insert({
          order_id: orderId,
          status: paymentData.status === 'completed' ? 'processing' : 'cancelled',
          comment: paymentData.status === 'completed' ? '결제 완료' : '결제 실패',
        })

      return {}
    } catch (error) {
      console.error('Unexpected payment update error:', error)
      return { error: '예상치 못한 오류가 발생했습니다.' }
    }
  }

  async getOrderDetails(orderId: string): Promise<{ data: any; error?: string }> {
    try {
      const { data, error } = await this.supabase
        .from('orders')
        .select(`
          *,
          payments (*)
        `)
        .eq('id', orderId)
        .single()

      if (error) {
        console.error('Order fetch error:', error)
        return { data: null, error: '주문 정보를 불러올 수 없습니다.' }
      }

      return { data }
    } catch (error) {
      console.error('Unexpected order fetch error:', error)
      return { data: null, error: '예상치 못한 오류가 발생했습니다.' }
    }
  }
}

export const paymentService = new PaymentService()

// Utility functions
export const generateOrderId = (): string => {
  return `order-${Date.now()}-${Math.random().toString(36).substring(2)}`
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price)
}
