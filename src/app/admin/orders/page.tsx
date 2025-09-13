'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import AdminAuth from '@/components/AdminAuth'
import { adminService, formatOrderStatus, formatCurrency, type OrderWithDetails } from '@/lib/admin'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    status: 'all',
    searchTerm: '',
    dateFrom: '',
    dateTo: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)

  const { signOut } = useAuth()

  useEffect(() => {
    fetchOrders()
  }, [filters])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await adminService.getAllOrders(
        filters.status === 'all' ? undefined : { ...filters }
      )
      
      if (fetchError) {
        throw new Error(fetchError)
      }
      
      setOrders(data || [])
    } catch (err) {
      console.error('Orders fetch error:', err)
      setError('주문 목록을 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await adminService.updateOrderStatus(
        orderId,
        newStatus as any,
        'admin-user-id', // This should be the current admin user ID
        `상태를 ${newStatus}로 변경`
      )

      if (error) {
        alert(error)
        return
      }

      // Refresh orders
      fetchOrders()
    } catch (err) {
      console.error('Status update error:', err)
      alert('상태 업데이트 중 오류가 발생했습니다.')
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const handleSignOut = async () => {
    await signOut()
  }

  // Pagination
  const totalPages = Math.ceil(orders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage)

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
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  로그아웃
                </button>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">주문 관리</h2>
            <p className="text-gray-600">모든 주문을 확인하고 상태를 관리하세요.</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">전체</option>
                  <option value="pending">결제 대기</option>
                  <option value="processing">제작 중</option>
                  <option value="completed">완료</option>
                  <option value="cancelled">취소</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
                <input
                  type="text"
                  placeholder="파일명 또는 이메일"
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">시작일</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                총 {orders.length}개의 주문
              </div>
              <button
                onClick={fetchOrders}
                className="btn-touch bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                새로고침
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin mx-auto h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mb-4"></div>
                <p className="text-gray-600">주문 목록을 불러오는 중...</p>
              </div>
            ) : error ? (
              <div className="p-6">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              </div>
            ) : paginatedOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">주문이 없습니다</h3>
                <p className="text-gray-600">조건에 맞는 주문을 찾을 수 없습니다.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          주문 정보
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          고객 정보
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          주문 옵션
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          금액
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          주문일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          작업
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedOrders.map((order) => {
                        const statusConfig = formatOrderStatus(order.status)
                        return (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                  {order.file_name}
                                </div>
                                <div className="text-sm text-gray-500 font-mono">
                                  #{order.id.slice(0, 8)}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {order.file_type.toUpperCase()} • {(order.file_size / 1024 / 1024).toFixed(2)}MB
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">{order.user?.email}</div>
                              {order.user?.name && (
                                <div className="text-sm text-gray-500">{order.user.name}</div>
                              )}
                              {order.user?.phone && (
                                <div className="text-xs text-gray-400">{order.user.phone}</div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">
                                {order.additional_options && (
                                  <div className="space-y-1">
                                    <div>{order.additional_options.size || 'A4'}</div>
                                    <div className="text-xs text-gray-500">
                                      {order.additional_options.paper === 'premium' ? '고급지' : '일반지'} • 
                                      {order.additional_options.quantity || 1}개
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className={`text-xs font-medium rounded-full px-2.5 py-0.5 border-0 ${statusConfig.color}`}
                              >
                                <option value="pending">결제 대기</option>
                                <option value="processing">제작 중</option>
                                <option value="completed">완료</option>
                                <option value="cancelled">취소</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {formatCurrency(order.total_amount)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {new Date(order.created_at).toLocaleDateString('ko-KR')}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <Link
                                  href={`/admin/orders/${order.id}`}
                                  className="text-sm text-primary-600 hover:text-primary-900 font-medium"
                                >
                                  상세
                                </Link>
                                {order.file_url && (
                                  <a
                                    href={order.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                  >
                                    파일
                                  </a>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">{startIndex + 1}</span>
                          {' - '}
                          <span className="font-medium">
                            {Math.min(startIndex + itemsPerPage, orders.length)}
                          </span>
                          {' / '}
                          <span className="font-medium">{orders.length}</span>
                          {' 건'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="btn-touch px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                          이전
                        </button>
                        <span className="px-3 py-1 text-sm text-gray-700">
                          {currentPage} / {totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="btn-touch px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                          다음
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AdminAuth>
  )
}
