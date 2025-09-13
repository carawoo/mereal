'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import FileUpload from '@/components/FileUpload'
import type { UploadedFile } from '@/lib/fileUpload'

export default function UploadPage() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [selectedOptions, setSelectedOptions] = useState({
    size: 'A4',
    paper: 'standard',
    cutting: false,
    quantity: 1,
    notes: ''
  })
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const router = useRouter()

  // Pricing calculation
  const calculatePrice = () => {
    let basePrice = 5000 // Base price for A4
    
    // Size pricing
    switch (selectedOptions.size) {
      case 'A3':
        basePrice = 8000
        break
      case 'A2':
        basePrice = 12000
        break
      default:
        basePrice = 5000
    }

    // Paper type
    if (selectedOptions.paper === 'premium') {
      basePrice *= 1.5
    }

    // Cutting
    if (selectedOptions.cutting) {
      basePrice += 2000
    }

    // Quantity
    const totalPrice = basePrice * selectedOptions.quantity

    return {
      basePrice,
      totalPrice: Math.round(totalPrice)
    }
  }

  const handleUploadComplete = (file: UploadedFile) => {
    setUploadedFile(file)
    setError(null)
  }

  const handleUploadError = (error: string) => {
    setError(error)
    setUploadedFile(null)
  }

  const handleOptionChange = (option: string, value: any) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: value
    }))
  }

  const handleProceedToPayment = () => {
    if (!uploadedFile) {
      setError('먼저 파일을 업로드해주세요.')
      return
    }

    const { totalPrice } = calculatePrice()
    
    // Store order data in sessionStorage for payment
    const orderData = {
      fileId: uploadedFile.id,
      fileName: uploadedFile.name,
      fileUrl: uploadedFile.url,
      options: selectedOptions,
      totalPrice
    }
    
    sessionStorage.setItem('orderData', JSON.stringify(orderData))
    router.push('/payment')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h2>
          <p className="text-gray-600 mb-6">파일 업로드를 위해서는 먼저 로그인해주세요.</p>
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full btn-touch bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-block"
            >
              로그인하기
            </Link>
            <Link
              href="/signup"
              className="w-full btn-touch border border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors inline-block"
            >
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const { basePrice, totalPrice } = calculatePrice()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-primary-600">Mereal</h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">안녕하세요, {user.user_metadata?.name || user.email}님</span>
              <Link href="/mypage" className="text-sm text-primary-600 hover:text-primary-700">
                마이페이지
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">파일 업로드</h2>
          <p className="text-gray-600">
            제작하고 싶은 파일을 업로드하고 옵션을 선택해주세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* File Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">1. 파일 업로드</h3>
              <FileUpload
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                maxFiles={1}
              />
            </div>

            {/* Options Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2. 제작 옵션</h3>
              
              <div className="space-y-4">
                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">사이즈</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['A4', 'A3', 'A2'].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleOptionChange('size', size)}
                        className={`btn-touch py-2 px-4 text-sm border rounded-lg transition-colors ${
                          selectedOptions.size === size
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Paper Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">용지 종류</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOptionChange('paper', 'standard')}
                      className={`btn-touch py-2 px-4 text-sm border rounded-lg transition-colors ${
                        selectedOptions.paper === 'standard'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      일반지
                    </button>
                    <button
                      onClick={() => handleOptionChange('paper', 'premium')}
                      className={`btn-touch py-2 px-4 text-sm border rounded-lg transition-colors ${
                        selectedOptions.paper === 'premium'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      고급지 (+50%)
                    </button>
                  </div>
                </div>

                {/* Cutting Option */}
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedOptions.cutting}
                      onChange={(e) => handleOptionChange('cutting', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      칼선 작업 (+2,000원)
                    </span>
                  </label>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">수량</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={selectedOptions.quantity}
                    onChange={(e) => handleOptionChange('quantity', parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    요청사항 (선택사항)
                  </label>
                  <textarea
                    rows={3}
                    value={selectedOptions.notes}
                    onChange={(e) => handleOptionChange('notes', e.target.value)}
                    placeholder="특별한 요청사항이 있으시면 입력해주세요."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">주문 요약</h3>
              
              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">📄</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)}MB
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">사이즈:</span>
                      <span className="font-medium">{selectedOptions.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">용지:</span>
                      <span className="font-medium">
                        {selectedOptions.paper === 'standard' ? '일반지' : '고급지'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">칼선:</span>
                      <span className="font-medium">
                        {selectedOptions.cutting ? '적용' : '미적용'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">수량:</span>
                      <span className="font-medium">{selectedOptions.quantity}개</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>기본 가격:</span>
                      <span>{basePrice.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>총 금액:</span>
                      <span className="text-primary-600">{totalPrice.toLocaleString()}원</span>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    className="btn-touch w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    결제하기
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">
                    파일을 업로드하면 주문 요약이 표시됩니다.
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
