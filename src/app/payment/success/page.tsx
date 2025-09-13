'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { paymentService } from '@/lib/payment'

function PaymentSuccessContent() {
  const [verifying, setVerifying] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orderData, setOrderData] = useState<any>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyPayment = async () => {
      const paymentKey = searchParams.get('paymentKey')
      const orderId = searchParams.get('orderId')
      const amount = searchParams.get('amount')

      if (!paymentKey || !orderId || !amount) {
        setError('결제 정보가 올바르지 않습니다.')
        setVerifying(false)
        return
      }

      try {
        // Verify payment
        const isValid = await paymentService.verifyPayment(
          paymentKey,
          orderId,
          parseInt(amount)
        )

        if (!isValid) {
          setError('결제 검증에 실패했습니다.')
          setVerifying(false)
          return
        }

        // Get order details
        const { data, error: orderError } = await paymentService.getOrderDetails(orderId)
        
        if (orderError) {
          setError(orderError)
          setVerifying(false)
          return
        }

        setOrderData(data)
        
        // Clear session storage
        sessionStorage.removeItem('orderData')
        
      } catch (err) {
        console.error('Payment verification error:', err)
        setError('결제 처리 중 오류가 발생했습니다.')
      } finally {
        setVerifying(false)
      }
    }

    verifyPayment()
  }, [searchParams])

  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="animate-spin mx-auto h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">결제 확인 중</h2>
          <p className="text-gray-600">잠시만 기다려주세요...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">결제 처리 실패</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Link
              href="/upload"
              className="w-full btn-touch bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-block"
            >
              다시 시도하기
            </Link>
            <Link
              href="/"
              className="w-full btn-touch border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-block"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-primary-600">Mereal</h1>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">결제가 완료되었습니다!</h2>
          <p className="text-gray-600 mb-8">
            주문이 성공적으로 접수되었습니다. 제작이 시작되면 알려드리겠습니다.
          </p>

          {/* Order Summary */}
          {orderData && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">주문 정보</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">주문 번호:</span>
                  <span className="font-mono text-gray-900">{orderData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">파일명:</span>
                  <span className="font-medium text-gray-900">{orderData.file_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제 금액:</span>
                  <span className="font-bold text-primary-600">
                    {orderData.total_amount?.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">상태:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    제작 대기 중
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-3">다음 단계</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-blue-200 text-blue-900 rounded-full text-xs font-bold flex items-center justify-center mr-3 mt-0.5">1</span>
                관리자가 파일을 검토하고 제작을 시작합니다.
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-blue-200 text-blue-900 rounded-full text-xs font-bold flex items-center justify-center mr-3 mt-0.5">2</span>
                제작 완료 후 배송이 시작됩니다.
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-blue-200 text-blue-900 rounded-full text-xs font-bold flex items-center justify-center mr-3 mt-0.5">3</span>
                마이페이지에서 진행 상황을 확인할 수 있습니다.
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/mypage"
              className="btn-touch flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              마이페이지에서 확인하기
            </Link>
            <Link
              href="/"
              className="btn-touch flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              문의사항이 있으시면 언제든지 연락주세요.<br />
              <a href="mailto:support@mereal.co.kr" className="text-primary-600 hover:text-primary-700">
                support@mereal.co.kr
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="animate-spin mx-auto h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-600">결제 정보를 확인하는 중...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
