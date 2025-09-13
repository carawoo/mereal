'use client'

import Header from '@/components/Header'
import Link from 'next/link'

const values = [
  {
    title: '품질 우선',
    description: '최고급 인쇄 장비와 엄격한 품질 관리로 완벽한 결과물을 제공합니다.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: '고객 중심',
    description: '고객의 만족이 우리의 최우선 목표입니다. 언제든지 도움을 드리겠습니다.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: '혁신 추구',
    description: '최신 기술과 창의적인 아이디어로 더 나은 서비스를 만들어갑니다.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: '신뢰성',
    description: '약속한 품질과 납기를 반드시 지키며, 투명한 소통을 실천합니다.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  }
]

const team = [
  {
    name: '김메리',
    position: 'CEO & Founder',
    description: '15년간의 인쇄업계 경험을 바탕으로 메리얼을 설립했습니다.',
    image: '/api/placeholder/150/150'
  },
  {
    name: '박얼리',
    position: 'CTO',
    description: '기술 혁신을 통해 더 나은 사용자 경험을 만들어갑니다.',
    image: '/api/placeholder/150/150'
  },
  {
    name: '이리얼',
    position: 'Head of Design',
    description: '창의적인 디자인으로 고객의 아이디어를 현실로 구현합니다.',
    image: '/api/placeholder/150/150'
  }
]

const milestones = [
  {
    year: '2024',
    title: '메리얼 서비스 출시',
    description: '온라인 맞춤형 인쇄 서비스 정식 런칭'
  },
  {
    year: '2023',
    title: '회사 설립',
    description: '㈜메리얼 법인 설립 및 사업 준비'
  },
  {
    year: '2022',
    title: '아이디어 구상',
    description: '고품질 온라인 인쇄 서비스 기획 시작'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            메리얼 이야기
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            당신의 아이디어를 현실로 만드는 것이 우리의 꿈입니다.
            메리얼은 고품질 인쇄 서비스를 통해 모든 사람이 자신만의 특별한 굿즈를 
            쉽고 간편하게 제작할 수 있도록 돕습니다.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">미션</h2>
            <p className="text-gray-600 leading-relaxed">
              누구나 쉽게 접근할 수 있는 고품질 인쇄 서비스를 제공하여, 
              개인의 창의성과 비즈니스의 성장을 돕는 것입니다. 
              복잡한 과정 없이 간단한 클릭만으로 전문가 수준의 인쇄물을 제작할 수 있도록 합니다.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">비전</h2>
            <p className="text-gray-600 leading-relaxed">
              대한민국 최고의 온라인 맞춤형 인쇄 플랫폼이 되어, 
              모든 사람이 자신만의 특별한 굿즈를 통해 개성을 표현하고 
              소중한 순간을 기록할 수 있는 세상을 만들어가겠습니다.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">핵심 가치</h2>
            <p className="text-xl text-gray-600">메리얼이 추구하는 가치와 원칙입니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company History */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">회사 연혁</h2>
            <p className="text-xl text-gray-600">메리얼의 성장 과정을 소개합니다</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {milestone.year}
                  </div>
                  <div className="ml-8 bg-white rounded-xl p-6 shadow-sm flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">팀 소개</h2>
            <p className="text-xl text-gray-600">메리얼을 만들어가는 사람들을 만나보세요</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">회사 정보</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex">
                  <span className="w-20 font-medium">회사명</span>
                  <span>㈜메리얼 (Mereal Inc.)</span>
                </div>
                <div className="flex">
                  <span className="w-20 font-medium">설립일</span>
                  <span>2023년 12월</span>
                </div>
                <div className="flex">
                  <span className="w-20 font-medium">대표자</span>
                  <span>김메리</span>
                </div>
                <div className="flex">
                  <span className="w-20 font-medium">사업자</span>
                  <span>123-45-67890</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">연락처</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex">
                  <span className="w-20 font-medium">이메일</span>
                  <span>support@mereal.co.kr</span>
                </div>
                <div className="flex">
                  <span className="w-20 font-medium">전화</span>
                  <span>1588-0000</span>
                </div>
                <div className="flex">
                  <span className="w-20 font-medium">주소</span>
                  <span>서울특별시 강남구 테헤란로 123</span>
                </div>
                <div className="flex">
                  <span className="w-20 font-medium">운영시간</span>
                  <span>평일 09:00-18:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">메리얼과 함께하세요</h2>
          <p className="text-xl opacity-90 mb-8">
            당신의 아이디어를 현실로 만들어보세요. 지금 시작하면 특별한 할인 혜택을 받을 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="btn-touch bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              지금 시작하기
            </Link>
            <Link
              href="/contact"
              className="btn-touch border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
