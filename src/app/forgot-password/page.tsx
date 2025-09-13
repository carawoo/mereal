'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        setError(error.message)
      } else {
        setIsSuccess(true)
      }
    } catch (err: any) {
      setError('비밀번호 재설정 이메일 전송에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col justify-center py-12 px-4">
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                이메일을 확인해주세요
              </h2>
              
              <p className="text-gray-600 mb-6">
                <strong>{email}</strong>로 비밀번호 재설정 링크를 보내드렸습니다.
                이메일을 확인하고 링크를 클릭하여 새 비밀번호를 설정해주세요.
              </p>
              
              <div className="space-y-4">
                <Link
                  href="/login"
                  className="w-full btn-touch bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-block text-center"
                >
                  로그인 페이지로 돌아가기
                </Link>
                
                <button
                  onClick={() => {
                    setIsSuccess(false)
                    setEmail('')
                  }}
                  className="w-full btn-touch text-gray-600 hover:text-gray-800 py-2 transition-colors"
                >
                  다른 이메일로 재시도
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  이메일이 도착하지 않았나요? 스팸함을 확인해보시거나 
                  <button 
                    onClick={handleSubmit}
                    className="text-primary-600 hover:text-primary-700 ml-1"
                  >
                    다시 전송
                  </button>
                  해주세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-col justify-center py-12 px-4">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              비밀번호 찾기
            </h2>
            <p className="text-gray-600">
              가입하신 이메일 주소를 입력해주세요.
              비밀번호 재설정 링크를 보내드립니다.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 주소
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="이메일을 입력하세요"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-touch bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    전송 중...
                  </div>
                ) : (
                  '비밀번호 재설정 이메일 보내기'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                로그인 페이지로 돌아가기
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  계정이 없으신가요?{' '}
                  <Link href="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                    회원가입
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">도움이 필요하세요?</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• 이메일이 도착하지 않으면 스팸함을 확인해주세요</p>
              <p>• 이메일 주소를 정확히 입력했는지 확인해주세요</p>
              <p>• 가입하지 않은 이메일로는 재설정 링크가 전송되지 않습니다</p>
            </div>
            <div className="mt-4">
              <Link
                href="/contact"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                문의하기 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
