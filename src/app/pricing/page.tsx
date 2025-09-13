'use client'

import Link from 'next/link'
import Header from '@/components/Header'

const pricingPlans = [
  {
    name: 'A4 기본',
    price: 5000,
    size: 'A4 (210×297mm)',
    description: '가장 일반적인 사이즈로 문서, 포스터 등에 적합',
    features: [
      '일반지 기본 제공',
      '고품질 컬러 인쇄',
      '빠른 제작 (1-2일)',
      '안전한 포장 배송'
    ],
    popular: false
  },
  {
    name: 'A3 프리미엄',
    price: 8000,
    size: 'A3 (297×420mm)',
    description: '큰 사이즈로 포스터, 도면 등에 최적화',
    features: [
      '고급지 기본 제공',
      '프리미엄 컬러 인쇄',
      '전문가 품질 검수',
      '빠른 제작 (2-3일)',
      '프리미엄 포장',
      '무료 칼선 작업'
    ],
    popular: true
  },
  {
    name: 'A2 대형',
    price: 12000,
    size: 'A2 (420×594mm)',
    description: '대형 포스터, 전시용 자료에 완벽',
    features: [
      '프리미엄지 기본 제공',
      '최고급 인쇄 품질',
      '전문 디자이너 검수',
      '정밀 제작 (3-4일)',
      '특수 포장',
      '무료 칼선 + 코팅'
    ],
    popular: false
  }
]

const additionalServices = [
  {
    name: '칼선 작업',
    price: 2000,
    description: '정확한 재단선을 통한 완벽한 마감',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6V7a2 2 0 00-2-2H5a2 2 0 00-2 2v3m0 0v8a2 2 0 002 2h14a2 2 0 002-2v-8m0 0V7" />
      </svg>
    )
  },
  {
    name: '고급지 업그레이드',
    price: '+50%',
    description: '더욱 고급스러운 질감과 내구성',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  {
    name: '특급 배송',
    price: 3000,
    description: '당일 제작 완료 (오전 주문 시)',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    name: '대량 할인',
    price: '최대 30%',
    description: '10개 이상 주문 시 할인 적용',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    )
  }
]

const faqs = [
  {
    question: '어떤 파일 형식을 지원하나요?',
    answer: 'PDF, PSD, AI, PNG, JPG, JPEG 파일을 지원합니다. 최대 10MB까지 업로드 가능합니다.'
  },
  {
    question: '제작 기간은 얼마나 걸리나요?',
    answer: 'A4는 1-2일, A3는 2-3일, A2는 3-4일이 소요됩니다. 특급 배송 옵션 선택 시 당일 제작 가능합니다.'
  },
  {
    question: '수정이나 재제작이 가능한가요?',
    answer: '고객 실수로 인한 재제작은 추가 비용이 발생하며, 저희 실수로 인한 경우 무료 재제작해드립니다.'
  },
  {
    question: '대량 주문 할인이 있나요?',
    answer: '10개 이상 주문 시 10%, 50개 이상 20%, 100개 이상 30% 할인을 제공합니다.'
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            투명하고 합리적인 가격
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            숨겨진 비용 없이 명확한 가격으로 고품질 인쇄 서비스를 제공합니다.
            토스페이먼츠를 통한 안전한 결제로 더욱 신뢰할 수 있습니다.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-sm p-8 ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    가장 인기
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.size}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price.toLocaleString()}</span>
                  <span className="text-gray-600 ml-1">원</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href="/upload"
                className={`w-full btn-touch py-3 px-6 rounded-lg font-semibold transition-colors text-center inline-block ${
                  plan.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                지금 주문하기
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">추가 서비스</h2>
            <p className="text-xl text-gray-600">더욱 완벽한 결과물을 위한 옵션 서비스들</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                <div className="text-2xl font-bold text-primary-600 mb-3">{service.price}</div>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <p className="text-xl text-gray-600">가격과 서비스에 대한 궁금한 점들을 확인해보세요</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">지금 바로 시작해보세요</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            파일 업로드부터 결제까지 간단한 3단계로 완성됩니다.
            첫 주문 시 무료 칼선 서비스를 제공해드립니다!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="btn-touch bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              파일 업로드하기
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
