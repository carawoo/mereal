'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminAuth from '@/components/AdminAuth'

// 가상의 분석 데이터
const analyticsData = {
  overview: {
    totalOrders: 1247,
    totalRevenue: 15680000,
    totalUsers: 892,
    conversionRate: 3.2
  },
  monthlyData: [
    { month: '1월', orders: 89, revenue: 1120000, users: 67 },
    { month: '2월', orders: 124, revenue: 1560000, users: 89 },
    { month: '3월', orders: 156, revenue: 1980000, users: 112 },
    { month: '4월', orders: 143, revenue: 1810000, users: 98 },
    { month: '5월', orders: 178, revenue: 2250000, users: 134 },
    { month: '6월', orders: 192, revenue: 2430000, users: 145 },
    { month: '7월', orders: 165, revenue: 2090000, users: 119 },
    { month: '8월', orders: 200, revenue: 2540000, users: 156 }
  ],
  topProducts: [
    { name: 'A4 일반지', orders: 456, percentage: 36.6 },
    { name: 'A3 고급지', orders: 312, percentage: 25.0 },
    { name: 'A4 고급지', orders: 234, percentage: 18.8 },
    { name: 'A2 프리미엄지', orders: 156, percentage: 12.5 },
    { name: 'A5 일반지', orders: 89, percentage: 7.1 }
  ],
  orderStatus: {
    pending: 23,
    paid: 45,
    processing: 78,
    shipped: 234,
    delivered: 867
  }
}

export default function AdminAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num)
  }

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">분석 대시보드</h1>
                <p className="text-gray-600 mt-2">비즈니스 성과와 주요 지표를 확인하세요</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="week">최근 1주</option>
                  <option value="month">최근 1개월</option>
                  <option value="quarter">최근 3개월</option>
                  <option value="year">최근 1년</option>
                </select>
              </div>
            </div>

            {/* Breadcrumb */}
            <nav className="flex mt-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link href="/" className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span className="text-gray-500">홈</span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">
                    관리자
                  </Link>
                </li>
                <li>
                  <Link href="/admin/orders" className="text-sm text-gray-600 hover:text-gray-900">
                    주문 관리
                  </Link>
                </li>
                <li>
                  <span className="text-sm font-medium text-primary-600">분석</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 주문</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.overview.totalOrders)}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-green-600 text-sm font-medium">↗ +12.5%</span>
                <span className="text-gray-600 text-sm ml-2">전월 대비</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 매출</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.overview.totalRevenue)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-green-600 text-sm font-medium">↗ +18.2%</span>
                <span className="text-gray-600 text-sm ml-2">전월 대비</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 사용자</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.overview.totalUsers)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-green-600 text-sm font-medium">↗ +8.1%</span>
                <span className="text-gray-600 text-sm ml-2">전월 대비</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">전환율</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.conversionRate}%</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-red-600 text-sm font-medium">↘ -2.3%</span>
                <span className="text-gray-600 text-sm ml-2">전월 대비</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Monthly Trend Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">월별 주문 추이</h3>
              <div className="space-y-4">
                {analyticsData.monthlyData.slice(-6).map((data, index) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-12">{data.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(data.orders / Math.max(...analyticsData.monthlyData.map(d => d.orders))) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-16 text-right">{data.orders}건</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">인기 상품</h3>
              <div className="space-y-4">
                {analyticsData.topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-700">{product.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900">{product.orders}건</span>
                      <span className="text-xs text-gray-500 block">{product.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Status Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">주문 상태별 분포</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{analyticsData.orderStatus.pending}</div>
                <div className="text-sm text-yellow-700 mt-1">결제 대기</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{analyticsData.orderStatus.paid}</div>
                <div className="text-sm text-blue-700 mt-1">결제 완료</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{analyticsData.orderStatus.processing}</div>
                <div className="text-sm text-purple-700 mt-1">제작 중</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{analyticsData.orderStatus.shipped}</div>
                <div className="text-sm text-orange-700 mt-1">배송 중</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{analyticsData.orderStatus.delivered}</div>
                <div className="text-sm text-green-700 mt-1">배송 완료</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">빠른 작업</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/orders"
                className="flex items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <svg className="w-8 h-8 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">주문 관리</div>
                  <div className="text-sm text-gray-600">모든 주문 현황 확인</div>
                </div>
              </Link>

              <button className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">리포트 다운로드</div>
                  <div className="text-sm text-gray-600">Excel 형태로 내보내기</div>
                </div>
              </button>

              <button className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h8m-6 0l-2 9a2 2 0 002 2h4a2 2 0 002-2l-2-9m-6 0V7" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">데이터 정리</div>
                  <div className="text-sm text-gray-600">오래된 데이터 정리</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminAuth>
  )
}
