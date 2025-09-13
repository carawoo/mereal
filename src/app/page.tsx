'use client'

import Link from 'next/link'
import Header from '@/components/Header'

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            나만의 특별한
            <span className="text-primary-600 block">굿즈를 만들어보세요</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            고품질 인쇄와 정성스러운 제작으로 당신의 아이디어를 현실로 만들어드립니다.
            PDF, PSD, AI 파일부터 이미지까지 다양한 형태로 업로드 가능합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/upload" 
              className="btn-touch w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
            >
              지금 시작하기
            </Link>
            <Link 
              href="/portfolio" 
              className="btn-touch w-full sm:w-auto border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              작업 사례 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            왜 메리얼을 선택해야 할까요?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">간편한 업로드</h4>
              <p className="text-gray-600">
                PDF, PSD, AI, PNG, JPG 등 다양한 파일 형식을 지원합니다.
                모바일에서도 쉽게 업로드할 수 있어요.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">투명한 가격</h4>
              <p className="text-gray-600">
                토스 페이먼츠를 통한 안전한 결제 시스템으로
                투명하고 합리적인 가격을 제공합니다.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">실시간 관리</h4>
              <p className="text-gray-600">
                주문부터 배송까지 실시간으로 진행상황을 확인할 수 있고,
                마이페이지에서 모든 내역을 관리할 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            간단한 3단계로 완성
          </h3>
          
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">파일 업로드</h4>
                <p className="text-gray-600">원하는 디자인 파일을 업로드하고 옵션을 선택하세요.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">결제 진행</h4>
                <p className="text-gray-600">토스 페이먼츠로 안전하고 간편하게 결제를 완료하세요.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">제작 및 배송</h4>
                <p className="text-gray-600">전문가가 정성껏 제작하여 안전하게 배송해드립니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            지금 바로 시작해보세요
          </h3>
          <p className="text-xl text-primary-100 mb-8">
            회원가입하고 첫 주문 시 특별 할인 혜택을 받아보세요!
          </p>
          <Link 
            href="/signup" 
            className="btn-touch inline-block bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            무료 회원가입
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Mereal</h4>
              <p className="text-gray-400">
                프리미엄 굿즈 제작 서비스
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3">서비스</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services">굿즈 제작</Link></li>
                <li><Link href="/pricing">가격 안내</Link></li>
                <li><Link href="/portfolio">포트폴리오</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3">고객지원</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/faq">자주 묻는 질문</Link></li>
                <li><Link href="/contact">문의하기</Link></li>
                <li><Link href="/guide">이용가이드</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3">회사정보</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about">회사소개</Link></li>
                <li><Link href="/terms">이용약관</Link></li>
                <li><Link href="/privacy">개인정보처리방침</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mereal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
