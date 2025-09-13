'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'

const faqCategories = [
  {
    name: '전체',
    key: 'all'
  },
  {
    name: '주문/결제',
    key: 'order'
  },
  {
    name: '파일 업로드',
    key: 'file'
  },
  {
    name: '제작/배송',
    key: 'production'
  },
  {
    name: '계정/기타',
    key: 'account'
  }
]

const faqs = [
  {
    category: 'order',
    question: '주문은 어떻게 하나요?',
    answer: '파일 업로드 페이지에서 제작할 파일을 업로드하고, 사이즈와 옵션을 선택한 후 토스페이먼츠로 안전하게 결제하시면 됩니다. 회원가입 후 이용 가능합니다.'
  },
  {
    category: 'order',
    question: '결제 방법은 어떤 것들이 있나요?',
    answer: '토스페이먼츠를 통해 신용카드, 체크카드, 계좌이체, 간편결제(토스페이, 카카오페이 등)를 지원합니다. 모든 결제는 SSL 보안으로 안전하게 처리됩니다.'
  },
  {
    category: 'order',
    question: '주문 취소나 환불이 가능한가요?',
    answer: '제작 시작 전까지는 100% 환불 가능합니다. 제작이 시작된 후에는 부분 환불만 가능하며, 완성된 제품의 경우 품질 문제가 있을 때만 환불해드립니다.'
  },
  {
    category: 'file',
    question: '어떤 파일 형식을 지원하나요?',
    answer: 'PDF, PSD, AI, PNG, JPG, JPEG 파일을 지원합니다. 파일 크기는 최대 10MB까지 업로드 가능하며, 해상도는 300DPI 이상을 권장합니다.'
  },
  {
    category: 'file',
    question: '파일 해상도나 크기에 제한이 있나요?',
    answer: '최대 A3 사이즈(4961x3508 픽셀)까지 지원하며, 파일 크기는 10MB 이하여야 합니다. 인쇄 품질을 위해 300DPI 이상의 해상도를 권장합니다.'
  },
  {
    category: 'file',
    question: '업로드한 파일을 수정할 수 있나요?',
    answer: '제작 시작 전까지는 파일 교체가 가능합니다. 마이페이지에서 주문 상태를 확인하고, "결제 대기" 상태일 때만 파일 수정이 가능합니다.'
  },
  {
    category: 'production',
    question: '제작 기간은 얼마나 걸리나요?',
    answer: 'A4는 1-2일, A3는 2-3일, A2는 3-4일이 소요됩니다. 특급 배송 옵션(+3,000원) 선택 시 당일 제작 완료 가능합니다. (오전 10시 이전 주문 시)'
  },
  {
    category: 'production',
    question: '배송은 어떻게 이루어지나요?',
    answer: '제작 완료 후 안전한 포장을 통해 택배로 배송됩니다. 배송비는 무료이며, 송장번호는 마이페이지에서 확인 가능합니다. 일반적으로 1-2일 내 배송됩니다.'
  },
  {
    category: 'production',
    question: '제작 진행 상황을 확인할 수 있나요?',
    answer: '마이페이지에서 실시간으로 제작 진행 상황을 확인할 수 있습니다. "결제 완료 → 제작 중 → 제작 완료 → 배송 중 → 배송 완료" 단계로 진행됩니다.'
  },
  {
    category: 'production',
    question: '품질에 문제가 있으면 어떻게 하나요?',
    answer: '품질 문제 발견 시 즉시 고객센터로 연락주세요. 저희 실수로 인한 문제는 무료로 재제작해드리며, 배송비도 저희가 부담합니다.'
  },
  {
    category: 'account',
    question: '회원가입 없이 주문할 수 있나요?',
    answer: '아니요, 주문 관리와 고객 서비스를 위해 회원가입이 필요합니다. 간단한 이메일 인증만으로 쉽게 가입할 수 있습니다.'
  },
  {
    category: 'account',
    question: '개인정보는 어떻게 보호되나요?',
    answer: '개인정보보호법에 따라 안전하게 관리되며, 주문 처리 목적으로만 사용됩니다. 제3자에게 제공되지 않으며, 서비스 탈퇴 시 즉시 삭제됩니다.'
  },
  {
    category: 'account',
    question: '대량 주문 시 할인이 있나요?',
    answer: '10개 이상 주문 시 10%, 50개 이상 20%, 100개 이상 30% 할인을 제공합니다. 대량 주문의 경우 별도 문의를 통해 더 나은 조건을 제공할 수 있습니다.'
  }
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            자주 묻는 질문
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            메리얼 서비스에 대해 궁금한 점들을 빠르게 해결해보세요.
            찾는 답변이 없다면 언제든지 문의해주세요.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {faqCategories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-16">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-gray-400 transform transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-primary-600 rounded-2xl p-12 text-white">
          <h2 className="text-2xl font-bold mb-4">답변을 찾지 못하셨나요?</h2>
          <p className="text-lg opacity-90 mb-8">
            언제든지 문의해주세요. 빠르고 정확한 답변을 드리겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-touch bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              문의하기
            </Link>
            <Link
              href="/upload"
              className="btn-touch border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              바로 주문하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
