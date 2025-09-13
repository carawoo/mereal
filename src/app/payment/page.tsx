'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { paymentService, generateOrderId } from '@/lib/payment'

interface OrderData {
  fileId: string
  fileName: string
  fileUrl: string
  options: {
    size: string
    paper: string
    cutting: boolean
    quantity: number
    notes: string
  }
  totalPrice: number
}

export default function PaymentPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Load order data from sessionStorage
    const storedData = sessionStorage.getItem('orderData')
    if (storedData) {
      try {
        const data = JSON.parse(storedData)
        setOrderData(data)
      } catch (err) {
        setError('주문 정보를 불러올 수 없습니다.')
        router.push('/upload')
      }
    } else {
      setError('주문 정보가 없습니다.')
      router.push('/upload')
    }
  }, [router])

  const handlePayment = async () => {
    if (!user || !orderData || !agreedToTerms) {
      if (!agreedToTerms) {
        setError('결제 약관에 동의해주세요.')
      }
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create order in database
      const { orderId, error: orderError } = await paymentService.createOrder({
        userId: user.id,
        fileId: orderData.fileId,
        fileName: orderData.fileName,
        fileUrl: orderData.fileUrl,
        fileType: orderData.fileName.split('.').pop() || '',
        fileSize: 0, // This should be passed from the upload
        options: orderData.options,
        totalAmount: orderData.totalPrice,
      })

      if (orderError) {
        setError(orderError)
        setLoading(false)
        return
      }

      // Initialize Toss Payments
      await paymentService.initialize()

      // Request payment
      await paymentService.requestPayment({
        orderId,
        amount: orderData.totalPrice,
        orderName: `${orderData.fileName} - ${orderData.options.size} ${orderData.options.quantity}개`,
        customerName: user.user_metadata?.name || user.email?.split('@')[0] || '고객',
        customerEmail: user.email || '',
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      })

    } catch (error) {
      console.error('Payment error:', error)
      setError('결제 처리 중 오류가 발생했습니다.')
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h2>
          <Link
            href="/login"
            className="btn-touch bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-block"
          >
            로그인하기
          </Link>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="animate-spin mx-auto h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-600">주문 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-primary-600">Mereal</h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">안녕하세요, {user.user_metadata?.name || user.email}님</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">결제하기</h2>
          <p className="text-gray-600">주문 내용을 확인하고 결제를 진행해주세요.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">주문 상세</h3>
          
          <div className="space-y-4">
            {/* File Info */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">📄</span>
              <div>
                <p className="font-medium text-gray-900">{orderData.fileName}</p>
                <p className="text-sm text-gray-500">업로드된 파일</p>
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">사이즈:</span>
                <span className="ml-2 font-medium">{orderData.options.size}</span>
              </div>
              <div>
                <span className="text-gray-600">용지:</span>
                <span className="ml-2 font-medium">
                  {orderData.options.paper === 'standard' ? '일반지' : '고급지'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">칼선:</span>
                <span className="ml-2 font-medium">
                  {orderData.options.cutting ? '적용' : '미적용'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">수량:</span>
                <span className="ml-2 font-medium">{orderData.options.quantity}개</span>
              </div>
            </div>

            {/* Notes */}
            {orderData.options.notes && (
              <div>
                <p className="text-sm text-gray-600 mb-1">요청사항:</p>
                <p className="text-sm bg-gray-50 p-3 rounded-lg">{orderData.options.notes}</p>
              </div>
            )}

            {/* Price */}
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>결제 금액</span>
                <span className="text-primary-600">{orderData.totalPrice.toLocaleString()}원</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">결제 수단</h3>
          <div className="flex items-center space-x-3 p-4 border border-primary-200 bg-primary-50 rounded-lg">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">신용카드/체크카드</p>
              <p className="text-sm text-gray-600">토스페이먼츠를 통한 안전한 결제</p>
            </div>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">약관 동의</h3>
          <div className="space-y-3">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <div className="text-sm">
                <span className="text-gray-900">
                  결제 진행에 동의하며, 
                  <Link href="/terms" className="text-primary-600 hover:text-primary-500 ml-1">
                    이용약관
                  </Link>
                  과
                  <Link href="/privacy" className="text-primary-600 hover:text-primary-500 ml-1">
                    개인정보처리방침
                  </Link>
                  에 동의합니다.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Link
            href="/upload"
            className="btn-touch flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center"
          >
            이전 단계
          </Link>
          <button
            onClick={handlePayment}
            disabled={loading || !agreedToTerms}
            className="btn-touch flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                결제 진행 중...
              </div>
            ) : (
              `${orderData.totalPrice.toLocaleString()}원 결제하기`
            )}
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <strong>안전한 결제</strong><br />
                토스페이먼츠의 보안 시스템을 통해 안전하게 결제가 처리됩니다. 
                카드 정보는 저장되지 않으며, PCI DSS 인증을 받은 시스템에서 처리됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
