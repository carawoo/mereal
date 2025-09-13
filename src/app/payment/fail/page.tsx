'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function PaymentFailPage() {
  const [errorInfo, setErrorInfo] = useState<{
    code?: string
    message?: string
  }>({})

  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    const message = searchParams.get('message')
    
    setErrorInfo({ code, message })
    
    // Clear session storage
    sessionStorage.removeItem('orderData')
  }, [searchParams])

  const getErrorMessage = (code?: string) => {
    switch (code) {
      case 'PAY_PROCESS_CANCELED':
        return '사용자가 결제를 취소했습니다.'
      case 'PAY_PROCESS_ABORTED':
        return '결제 진행 중 오류가 발생했습니다.'
      case 'REJECT_CARD_COMPANY':
        return '카드사에서 결제를 거절했습니다.'
      case 'INVALID_CARD_COMPANY':
        return '유효하지 않은 카드입니다.'
      case 'NOT_SUPPORTED_INSTALLMENT':
        return '지원하지 않는 할부 개월수입니다.'
      case 'EXCEED_MAX_DAILY_PAYMENT_COUNT':
        return '일일 결제 한도를 초과했습니다.'
      case 'NOT_AVAILABLE_BANK':
        return '은행 서비스 시간이 아닙니다.'
      case 'EXCEED_MAX_ONE_DAY_WITHDRAW_AMOUNT':
        return '일일 출금 한도를 초과했습니다.'
      case 'EXCEED_MAX_ONE_TIME_WITHDRAW_AMOUNT':
        return '1회 출금 한도를 초과했습니다.'
      case 'NOT_AVAILABLE_BANK_ACCOUNT':
        return '사용할 수 없는 계좌입니다.'
      default:
        return errorInfo.message || '결제 처리 중 오류가 발생했습니다.'
    }
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
          {/* Error Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">결제가 실패했습니다</h2>
          <p className="text-gray-600 mb-8">
            {getErrorMessage(errorInfo.code)}
          </p>

          {/* Error Details */}
          {errorInfo.code && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">오류 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">오류 코드:</span>
                  <span className="font-mono text-gray-900">{errorInfo.code}</span>
                </div>
                {errorInfo.message && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">상세 메시지:</span>
                    <span className="text-gray-900">{errorInfo.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Troubleshooting */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-3">해결 방법</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></span>
                카드 정보를 다시 확인해주세요.
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></span>
                카드 한도나 잔액을 확인해주세요.
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></span>
                다른 카드로 시도해보세요.
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></span>
                문제가 지속되면 고객센터로 문의해주세요.
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/upload"
              className="btn-touch flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              다시 시도하기
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
              결제 관련 문의사항이 있으시면 언제든지 연락주세요.<br />
              <a href="mailto:support@mereal.co.kr" className="text-primary-600 hover:text-primary-700">
                support@mereal.co.kr
              </a>
              {' | '}
              <a href="tel:1588-0000" className="text-primary-600 hover:text-primary-700">
                1588-0000
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
