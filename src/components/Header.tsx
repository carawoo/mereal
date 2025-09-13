'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import MobileNavigation from './MobileNavigation'

interface HeaderProps {
  showNavigation?: boolean
  className?: string
}

export default function Header({ showNavigation = true, className = '' }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className={`bg-white shadow-sm sticky top-0 z-40 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-primary-600">Mereal</h1>
              <span className="text-xs text-gray-500 hidden sm:block">메리얼</span>
            </Link>
          </div>

          {showNavigation && (
            <>
              {/* Desktop navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/upload" className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  파일 업로드
                </Link>
                <Link href="/portfolio" className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  포트폴리오
                </Link>
                <Link href="/pricing" className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  가격안내
                </Link>
                {user ? (
                  <Link href="/mypage" className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                    마이페이지
                  </Link>
                ) : (
                  <Link href="/login" className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                    로그인
                  </Link>
                )}
              </nav>

              {/* Desktop user menu */}
              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      안녕하세요, {user.user_metadata?.name || user.email?.split('@')[0]}님
                    </span>
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-600">
                        {user.user_metadata?.name?.[0] || user.email?.[0] || 'U'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/login"
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      회원가입
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile navigation */}
              <MobileNavigation />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
