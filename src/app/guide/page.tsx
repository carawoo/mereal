'use client'

import Header from '@/components/Header'
import Link from 'next/link'

const steps = [
  {
    number: 1,
    title: '회원가입 및 로그인',
    description: '메리얼 서비스 이용을 위해 회원가입을 진행합니다.',
    details: [
      '이메일과 비밀번호로 간단하게 가입',
      '이메일 인증을 통한 계정 활성화',
      '개인정보는 안전하게 암호화되어 보관'
    ],
    tips: '소셜 로그인은 현재 준비 중이며, 곧 지원 예정입니다.'
  },
  {
    number: 2,
    title: '파일 업로드',
    description: '제작하고 싶은 디자인 파일을 업로드합니다.',
    details: [
      '지원 형식: PDF, PSD, AI, PNG, JPG, JPEG',
      '최대 파일 크기: 10MB',
      '권장 해상도: 300DPI 이상',
      '최대 사이즈: A3 (4961×3508 픽셀)'
    ],
    tips: '모바일에서는 갤러리나 파일 앱에서 직접 선택할 수 있습니다.'
  },
  {
    number: 3,
    title: '옵션 선택',
    description: '사이즈, 용지, 수량 등 제작 옵션을 선택합니다.',
    details: [
      '사이즈: A4, A3, A2 중 선택',
      '용지: 일반지 또는 고급지',
      '칼선 작업: 필요시 추가 선택',
      '수량: 1개부터 100개까지'
    ],
    tips: '대량 주문 시 할인 혜택이 자동으로 적용됩니다.'
  },
  {
    number: 4,
    title: '결제 진행',
    description: '토스페이먼츠를 통해 안전하게 결제를 진행합니다.',
    details: [
      '신용카드, 체크카드 결제 지원',
      '계좌이체 및 간편결제 가능',
      'SSL 보안으로 안전한 결제',
      '결제 완료 즉시 제작 시작'
    ],
    tips: '결제 전 주문 내용을 다시 한 번 확인해주세요.'
  },
  {
    number: 5,
    title: '제작 및 품질 검수',
    description: '전문가가 파일을 검토하고 고품질로 제작합니다.',
    details: [
      '파일 호환성 및 품질 사전 검토',
      '전문 인쇄 장비로 정밀 제작',
      '품질 관리팀의 최종 검수',
      '실시간 제작 상태 알림'
    ],
    tips: '제작 중 문제 발견 시 즉시 연락드려 해결책을 제안합니다.'
  },
  {
    number: 6,
    title: '포장 및 배송',
    description: '완성된 제품을 안전하게 포장하여 배송합니다.',
    details: [
      '손상 방지를 위한 전문 포장',
      '전국 무료 배송 서비스',
      '송장번호 실시간 제공',
      '평균 1-2일 내 배송 완료'
    ],
    tips: '배송 상태는 마이페이지에서 실시간으로 확인 가능합니다.'
  }
]

const fileGuide = {
  recommended: [
    {
      format: 'PDF',
      description: '가장 안정적이고 호환성이 높은 형식',
      tips: '벡터 기반 파일로 저장하면 더욱 선명한 인쇄 가능'
    },
    {
      format: 'AI (Adobe Illustrator)',
      description: '벡터 그래픽으로 확대해도 깨지지 않음',
      tips: '아웃라인 처리 후 저장하면 폰트 문제 방지'
    },
    {
      format: 'PSD (Adobe Photoshop)',
      description: '고해상도 이미지 작업에 최적',
      tips: '레이어를 병합하고 300DPI로 저장 권장'
    }
  ],
  supported: [
    {
      format: 'PNG',
      description: '투명 배경 지원, 웹용 이미지에 적합',
      tips: '고해상도로 저장하여 인쇄 품질 확보'
    },
    {
      format: 'JPG/JPEG',
      description: '사진이나 복잡한 이미지에 적합',
      tips: '압축률을 낮게 설정하여 품질 손실 최소화'
    }
  ]
}

const qualityTips = [
  {
    title: '해상도 설정',
    content: '인쇄용 파일은 300DPI 이상으로 설정하세요. 72DPI는 모니터용으로 인쇄 시 품질이 떨어집니다.'
  },
  {
    title: '색상 모드',
    content: 'RGB보다는 CMYK 색상 모드를 사용하면 인쇄 시 색상 차이를 최소화할 수 있습니다.'
  },
  {
    title: '여백 설정',
    content: '중요한 내용은 가장자리에서 3mm 이상 여백을 두어 잘림 현상을 방지하세요.'
  },
  {
    title: '폰트 처리',
    content: '특수 폰트 사용 시 아웃라인 처리하거나 이미지로 변환하여 폰트 깨짐을 방지하세요.'
  }
]

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            이용 가이드
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            메리얼 서비스를 처음 이용하시나요? 
            주문부터 배송까지 전 과정을 쉽게 안내해드립니다.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">주문 과정</h2>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-16 bg-gray-200"></div>
                )}
                
                <div className="flex items-start">
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                    {step.number}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    <ul className="space-y-2 mb-4">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {step.tips && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex">
                          <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-blue-800 text-sm"><strong>팁:</strong> {step.tips}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* File Format Guide */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">파일 형식 가이드</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Recommended Formats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                권장 형식
              </h3>
              
              <div className="space-y-4">
                {fileGuide.recommended.map((format, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-900">{format.format}</h4>
                    <p className="text-gray-600 text-sm mb-2">{format.description}</p>
                    <p className="text-green-700 text-xs bg-green-50 px-2 py-1 rounded">
                      💡 {format.tips}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Formats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                지원 형식
              </h3>
              
              <div className="space-y-4">
                {fileGuide.supported.map((format, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900">{format.format}</h4>
                    <p className="text-gray-600 text-sm mb-2">{format.description}</p>
                    <p className="text-blue-700 text-xs bg-blue-50 px-2 py-1 rounded">
                      💡 {format.tips}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quality Tips */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">품질 향상 팁</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {qualityTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </span>
                  {tip.title}
                </h3>
                <p className="text-gray-600">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">이제 시작할 준비가 되셨나요?</h2>
          <p className="text-xl opacity-90 mb-8">
            가이드를 참고하여 완벽한 인쇄물을 제작해보세요!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="btn-touch bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              지금 시작하기
            </Link>
            <Link
              href="/faq"
              className="btn-touch border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              FAQ 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
