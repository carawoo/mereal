'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import AdminAuth from '@/components/AdminAuth'
import { adminService, formatOrderStatus, formatCurrency, type OrderWithDetails } from '@/lib/admin'

export default function AdminOrderDetailPage() {
  const [order, setOrder] = useState<OrderWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('')

  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const orderId = params.id as string

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail()
    }
  }, [orderId])

  const fetchOrderDetail = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await adminService.getAllOrders()
      
      if (fetchError) {
        throw new Error(fetchError)
      }

      const orderDetail = data?.find(o => o.id === orderId)
      if (!orderDetail) {
        setError('주문을 찾을 수 없습니다.')
        return
      }

      setOrder(orderDetail)
      setAdminNotes(orderDetail.admin_notes || '')
      setTrackingNumber(orderDetail.tracking_number || '')
      setEstimatedDeliveryDate(
        orderDetail.estimated_delivery_date 
          ? new Date(orderDetail.estimated_delivery_date).toISOString().split('T')[0]
          : ''
      )
    } catch (err) {
      console.error('Order detail fetch error:', err)
      setError('주문 상세 정보를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (newStatus: string) => {
    if (!order || !user) return

    try {
      setUpdating(true)
      const { error } = await adminService.updateOrderStatus(
        order.id,
        newStatus as any,
        user.id,
        `상태를 ${newStatus}로 변경`,
        trackingNumber || undefined,
        estimatedDeliveryDate || undefined
      )

      if (error) {
        alert(error)
        return
      }

      // Refresh order data
      await fetchOrderDetail()
    } catch (err) {
      console.error('Status update error:', err)
      alert('상태 업데이트 중 오류가 발생했습니다.')
    } finally {
      setUpdating(false)
    }
  }

  const handleNotesUpdate = async () => {
    if (!order || !user) return

    try {
      setUpdating(true)
      const { error } = await adminService.updateOrderNotes(
        order.id,
        adminNotes,
        user.id
      )

      if (error) {
        alert(error)
        return
      }

      alert('관리자 메모가 업데이트되었습니다.')
      await fetchOrderDetail()
    } catch (err) {
      console.error('Notes update error:', err)
      alert('메모 업데이트 중 오류가 발생했습니다.')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <AdminAuth requiredPermissions={['view_orders']}>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="animate-spin mx-auto h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">주문 정보 로딩 중</h2>
            <p className="text-gray-600">잠시만 기다려주세요...</p>
          </div>
        </div>
      </AdminAuth>
    )
  }

  if (error || !order) {
    return (
      <AdminAuth requiredPermissions={['view_orders']}>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">오류 발생</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.back()}
              className="btn-touch bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              돌아가기
            </button>
          </div>
        </div>
      </AdminAuth>
    )
  }

  const statusConfig = formatOrderStatus(order.status)

  return (
    <AdminAuth requiredPermissions={['view_orders']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold text-primary-600">Mereal</h1>
                  <span className="text-sm text-gray-500">관리자</span>
                </Link>
              </div>
              <nav className="flex items-center space-x-6">
                <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">
                  대시보드
                </Link>
                <Link href="/admin/orders" className="text-sm font-medium text-primary-600">
                  주문 관리
                </Link>
                <Link href="/admin/analytics" className="text-sm text-gray-600 hover:text-gray-900">
                  분석
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link href="/admin" className="text-gray-400 hover:text-gray-500">
                    관리자
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <Link href="/admin/orders" className="ml-4 text-gray-400 hover:text-gray-500">
                      주문 관리
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-4 text-gray-500">주문 상세</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">주문 상세</h2>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">주문 정보</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">주문 번호</dt>
                        <dd className="text-sm text-gray-900 font-mono">{order.id}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">파일명</dt>
                        <dd className="text-sm text-gray-900">{order.file_name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">파일 타입</dt>
                        <dd className="text-sm text-gray-900">{order.file_type.toUpperCase()}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">파일 크기</dt>
                        <dd className="text-sm text-gray-900">
                          {(order.file_size / 1024 / 1024).toFixed(2)} MB
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">주문일</dt>
                        <dd className="text-sm text-gray-900">
                          {new Date(order.created_at).toLocaleString('ko-KR')}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">최종 수정일</dt>
                        <dd className="text-sm text-gray-900">
                          {new Date(order.updated_at).toLocaleString('ko-KR')}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">고객 정보</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">이메일</dt>
                        <dd className="text-sm text-gray-900">{order.user?.email}</dd>
                      </div>
                      {order.user?.name && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">이름</dt>
                          <dd className="text-sm text-gray-900">{order.user.name}</dd>
                        </div>
                      )}
                      {order.user?.phone && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">전화번호</dt>
                          <dd className="text-sm text-gray-900">{order.user.phone}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>

                {/* File Preview */}
                {order.file_url && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">첨부 파일</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{order.file_name}</p>
                        <p className="text-sm text-gray-500">
                          {order.file_type.toUpperCase()} • {(order.file_size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <a
                        href={order.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-touch bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                      >
                        파일 보기
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Options */}
              {order.additional_options && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">주문 옵션</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">사이즈</dt>
                      <dd className="text-sm text-gray-900 font-medium">
                        {order.additional_options.size || 'A4'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">용지</dt>
                      <dd className="text-sm text-gray-900 font-medium">
                        {order.additional_options.paper === 'premium' ? '고급지' : '일반지'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">칼선</dt>
                      <dd className="text-sm text-gray-900 font-medium">
                        {order.additional_options.cutting ? '적용' : '미적용'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">수량</dt>
                      <dd className="text-sm text-gray-900 font-medium">
                        {order.additional_options.quantity || 1}개
                      </dd>
                    </div>
                  </div>
                  
                  {order.notes && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <dt className="text-sm font-medium text-gray-500 mb-2">고객 요청사항</dt>
                      <dd className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {order.notes}
                      </dd>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Info */}
              {order.payments && order.payments.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">결제 정보</h3>
                  <div className="space-y-4">
                    {order.payments.map((payment, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {payment.method} • {payment.status === 'completed' ? '결제완료' : '결제실패'}
                          </p>
                          {payment.approved_at && (
                            <p className="text-sm text-gray-500">
                              {new Date(payment.approved_at).toLocaleString('ko-KR')}
                            </p>
                          )}
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {formatCurrency(payment.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order History */}
              {order.order_status_history && order.order_status_history.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">상태 변경 이력</h3>
                  <div className="space-y-4">
                    {order.order_status_history
                      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                      .map((history, index) => {
                        const historyStatusConfig = formatOrderStatus(history.status)
                        return (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${historyStatusConfig.color}`}>
                                {historyStatusConfig.label}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{history.comment}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(history.created_at).toLocaleString('ko-KR')}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Management */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">상태 관리</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      주문 상태
                    </label>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(e.target.value)}
                      disabled={updating}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
                    >
                      <option value="pending">결제 대기</option>
                      <option value="processing">제작 중</option>
                      <option value="completed">완료</option>
                      <option value="cancelled">취소</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      송장 번호
                    </label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="송장 번호를 입력하세요"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      예상 배송일
                    </label>
                    <input
                      type="date"
                      value={estimatedDeliveryDate}
                      onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">관리자 메모</h3>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                  placeholder="관리자 전용 메모를 입력하세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  onClick={handleNotesUpdate}
                  disabled={updating}
                  className="mt-3 w-full btn-touch bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
                >
                  {updating ? '저장 중...' : '메모 저장'}
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleStatusUpdate('processing')}
                    disabled={updating || order.status === 'processing'}
                    className="w-full btn-touch bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    제작 시작
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('completed')}
                    disabled={updating || order.status === 'completed'}
                    className="w-full btn-touch bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    완료 처리
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('cancelled')}
                    disabled={updating || order.status === 'cancelled'}
                    className="w-full btn-touch bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    주문 취소
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">주문 요약</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">기본 금액</span>
                    <span className="font-medium">{formatCurrency(order.total_amount)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>총 금액</span>
                      <span className="text-primary-600">{formatCurrency(order.total_amount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminAuth>
  )
}
