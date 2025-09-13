'use client'

import Link from 'next/link'
import Header from '@/components/Header'

const portfolioItems = [
  {
    id: 1,
    title: '카페 브랜딩 패키지',
    category: '브랜딩',
    image: '/api/placeholder/400/300',
    description: '모던하고 세련된 카페 브랜딩을 위한 통합 패키지 디자인',
    tags: ['로고', '명함', '메뉴판', '포장지'],
    size: 'A4',
    material: '고급지'
  },
  {
    id: 2,
    title: '스타트업 회사 소개서',
    category: '비즈니스',
    image: '/api/placeholder/400/300',
    description: '투자 유치를 위한 전문적인 회사 소개서 디자인',
    tags: ['프레젠테이션', '인쇄물', '제본'],
    size: 'A4',
    material: '일반지'
  },
  {
    id: 3,
    title: '결혼식 초대장',
    category: '이벤트',
    image: '/api/placeholder/400/300',
    description: '우아하고 로맨틱한 결혼식 초대장 디자인',
    tags: ['초대장', '봉투', '스티커'],
    size: 'A5',
    material: '고급지'
  },
  {
    id: 4,
    title: '제품 카탈로그',
    category: '마케팅',
    image: '/api/placeholder/400/300',
    description: '제품의 매력을 극대화한 전문 카탈로그',
    tags: ['카탈로그', '제품소개', '브로슈어'],
    size: 'A4',
    material: '고급지'
  },
  {
    id: 5,
    title: '아트 포스터',
    category: '아트',
    image: '/api/placeholder/400/300',
    description: '독창적이고 감각적인 아트 포스터 시리즈',
    tags: ['포스터', '아트워크', '인테리어'],
    size: 'A3',
    material: '프리미엄지'
  },
  {
    id: 6,
    title: '교육 자료집',
    category: '교육',
    image: '/api/placeholder/400/300',
    description: '효과적인 학습을 위한 교육 자료 디자인',
    tags: ['교재', '워크북', '제본'],
    size: 'A4',
    material: '일반지'
  }
]

const categories = ['전체', '브랜딩', '비즈니스', '이벤트', '마케팅', '아트', '교육']

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            포트폴리오
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            메리얼과 함께한 다양한 프로젝트들을 확인해보세요. 
            고품질 인쇄와 정성스러운 제작으로 완성된 실제 작업 사례들입니다.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            나도 제작하기
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                index === 0
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {portfolioItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-primary-600 font-medium">{item.title}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-600">
                    {item.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{item.size}</span>
                    <span className="mx-1">•</span>
                    <span>{item.material}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            당신의 아이디어를 현실로 만들어보세요
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            PDF, PSD, AI 파일부터 이미지까지 다양한 형태의 파일을 업로드하여
            고품질 인쇄물을 제작할 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="btn-touch bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              지금 시작하기
            </Link>
            <Link
              href="/pricing"
              className="btn-touch border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              가격 확인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
