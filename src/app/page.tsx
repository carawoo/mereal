'use client'

import { useState } from 'react'
import { CHARACTER_POSES, type CharacterPose } from '@/lib/characterStyle'

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [transformedDescription, setTransformedDescription] = useState<string | null>(null)
  const [alternativeImages, setAlternativeImages] = useState<any[]>([])
  const [selectedAlternativeIndex, setSelectedAlternativeIndex] = useState<number | null>(null)
  const [mainImage, setMainImage] = useState<any>(null)
  const [mainCharacterDescription, setMainCharacterDescription] = useState<string | null>(null)
  const [selectedPose, setSelectedPose] = useState<string | null>(null)
  const [generatedImages, setGeneratedImages] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setTransformedDescription(null)
      setAlternativeImages([])
      setSelectedAlternativeIndex(null)
      setMainImage(null)
      setGeneratedImages([])
      setError(null)
    }
  }

  const handleExecute = async () => {
    if (!uploadedImage) {
      setError('이미지를 선택해주세요')
      return
    }

    setIsProcessing(true)
    setError(null)
    setProcessingStep('이미지 분석 중...')

    try {
      const formData = new FormData()
      formData.append('image', uploadedImage)
      formData.append('mode', 'transform')

      const transformResponse = await fetch('/api/character/transform', {
        method: 'POST',
        body: formData,
      })

      const transformData = await transformResponse.json()

      if (!transformData.success) {
        setError(transformData.error || '변환 중 오류가 발생했습니다')
        return
      }

      setTransformedDescription(transformData.data)
      setProcessingStep('캐릭터 생성 중...')

      const generateResponse = await fetch('/api/character/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterDescription: transformData.data,
          count: 2
        }),
      })

      const generateData = await generateResponse.json()

      if (generateData.success && generateData.data.images.length >= 2) {
        setAlternativeImages(generateData.data.images)
        setMainCharacterDescription(transformData.data)
      } else {
        setError(generateData.error || '대안 이미지 생성 중 오류가 발생했습니다')
      }
    } catch (err: any) {
      console.error('Execute error:', err)
      setError(`실행 중 오류가 발생했습니다: ${err.message || 'Unknown error'}`)
    } finally {
      setIsProcessing(false)
      setProcessingStep(null)
    }
  }

  const handleAlternativeSelect = (index: number) => {
    setSelectedAlternativeIndex(index)
    setMainImage(alternativeImages[index])
  }

  const handleGeneratePoses = async () => {
    if (selectedAlternativeIndex === null && selectedAlternativeIndex !== 0) {
      setError('대안 이미지를 선택해주세요')
      return
    }

    setIsProcessing(true)
    setError(null)
    setProcessingStep('포즈 생성 중...')

    try {
      const response = await fetch('/api/character/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterDescription: transformedDescription,
          count: 3,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedImages(data.data.images)
      } else {
        setError(data.error || '포즈 생성 중 오류가 발생했습니다')
      }
    } catch (err) {
      setError('포즈 생성 중 오류가 발생했습니다')
    } finally {
      setIsProcessing(false)
      setProcessingStep(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Mereal
                </h1>
                <p className="text-xs text-gray-500">AI 캐릭터 생성</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            반려동물의 특별한 순간을
            <br className="hidden sm:block" />
            <span className="text-blue-600"> 귀여운 캐릭터</span>로 만들어보세요
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI 기술로 당신의 반려동물을 독특한 플랫 스타일 캐릭터로 변환하고, 다양한 포즈로 재생성합니다
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-sm animate-fade-in">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Step 1: Upload */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">반려동물 사진 업로드</h3>
            </div>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={isProcessing}
              />
              <label
                htmlFor="image-upload"
                className={`flex flex-col items-center justify-center p-12 border-3 border-dashed rounded-xl cursor-pointer transition-all ${
                  isProcessing
                    ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                    : previewUrl
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Uploaded preview"
                      className="max-w-full max-h-64 rounded-lg shadow-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setUploadedImage(null)
                        setPreviewUrl(null)
                        setTransformedDescription(null)
                        setAlternativeImages([])
                        setSelectedAlternativeIndex(null)
                        setMainImage(null)
                        setGeneratedImages([])
                        setError(null)
                      }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      클릭하여 이미지 업로드
                    </p>
                    <p className="text-sm text-gray-500">JPG, PNG, GIF (최대 10MB)</p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Step 2: Execute */}
          {previewUrl && (
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-lg">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">AI 캐릭터 변환</h3>
              </div>

              <button
                onClick={handleExecute}
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg ${
                  isProcessing
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {processingStep || '처리 중...'}
                  </div>
                ) : (
                  '✨ 캐릭터 생성하기'
                )}
              </button>
            </div>
          )}

          {/* Step 3: Select Style */}
          {alternativeImages.length >= 2 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-lg">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">스타일 선택</h3>
              </div>

              <p className="text-gray-600 mb-6">마음에 드는 캐릭터 스타일을 선택해주세요</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {alternativeImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAlternativeSelect(idx)}
                    disabled={isProcessing}
                    className={`group relative overflow-hidden rounded-xl transition-all transform hover:scale-[1.02] ${
                      selectedAlternativeIndex === idx
                        ? 'ring-4 ring-blue-500 shadow-2xl'
                        : 'hover:shadow-xl'
                    }`}
                  >
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
                      {img && typeof img === 'object' && img.type === 'image' && (img.data || img.url) ? (
                        <img
                          src={img.url || `data:${img.mimeType || 'image/png'};base64,${img.data}`}
                          alt={`Alternative ${idx + 1}`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-6xl mb-3">🎨</div>
                            <p className="text-sm text-gray-500 font-medium">스타일 {idx + 1}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {selectedAlternativeIndex === idx && (
                      <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                        <div className="bg-blue-600 text-white rounded-full p-3 shadow-lg">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {selectedAlternativeIndex !== null && (
                <button
                  onClick={handleGeneratePoses}
                  disabled={isProcessing}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg ${
                    isProcessing
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {processingStep || '포즈 생성 중...'}
                    </div>
                  ) : (
                    '🎯 포즈 3개 생성하기'
                  )}
                </button>
              )}
            </div>
          )}

          {/* Step 4: Results */}
          {generatedImages.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-lg">4</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">생성된 캐릭터</h3>
              </div>

              <p className="text-gray-600 mb-6">다양한 포즈로 변환된 캐릭터를 확인하세요</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedImages.map((image, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-blue-400 transition-all">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
                      {image && typeof image === 'object' && image.type === 'image' && (image.data || image.url) ? (
                        <img
                          src={image.url || `data:${image.mimeType || 'image/png'};base64,${image.data}`}
                          alt={`Generated image ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-6xl mb-3">🎨</div>
                            <p className="text-sm text-gray-600 font-medium">이미지 {index + 1}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Made with ❤️ by Mereal
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}