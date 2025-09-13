'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden btn-touch inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
        aria-expanded="false"
      >
        <span className="sr-only">메뉴 열기</span>
        {!isOpen ? (
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ) : (
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="relative flex flex-col w-full max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <h1 className="text-xl font-bold text-primary-600">Mereal</h1>
                <span className="text-sm text-gray-500">메리얼</span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-touch p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
              {/* User Info */}
              {user && (
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600">
                          {user.user_metadata?.name?.[0] || user.email?.[0] || 'U'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.user_metadata?.name || user.email}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/') 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-900 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  홈
                </Link>
                
                <Link
                  href="/upload"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/upload') 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-900 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  파일 업로드
                </Link>

                {user && (
                  <Link
                    href="/mypage"
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/mypage') 
                        ? 'text-primary-600 bg-primary-50' 
                        : 'text-gray-900 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    마이페이지
                  </Link>
                )}

                <Link
                  href="/portfolio"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/portfolio') 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-900 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  포트폴리오
                </Link>

                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/pricing') 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-gray-900 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  가격안내
                </Link>
              </nav>

              {/* Support Links */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <Link
                    href="/faq"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    자주 묻는 질문
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    문의하기
                  </Link>
                  <Link
                    href="/guide"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    이용가이드
                  </Link>
                </div>
              </div>

              {/* Auth Actions */}
              <div className="border-t border-gray-200 pt-4">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    로그아웃
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center px-4 py-2 border border-primary-600 rounded-md text-sm font-medium text-primary-600 hover:bg-primary-50"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center px-4 py-2 bg-primary-600 rounded-md text-sm font-medium text-white hover:bg-primary-700"
                    >
                      회원가입
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
