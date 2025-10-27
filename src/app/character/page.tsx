'use client'

import { useState } from 'react'
import { CHARACTER_POSES, type CharacterPose } from '@/lib/characterStyle'

export default function CharacterPage() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [transformedDescription, setTransformedDescription] = useState<string | null>(null)
  const [alternativeImages, setAlternativeImages] = useState<any[]>([]) // 대안 이미지 2개
  const [selectedAlternativeIndex, setSelectedAlternativeIndex] = useState<number | null>(null) // 선택된 대안 이미지 인덱스
  const [mainImage, setMainImage] = useState<any>(null) // 선택된 메인 이미지
  const [mainCharacterDescription, setMainCharacterDescription] = useState<string | null>(null) // 메인 이미지의 캐릭터 설명
  const [selectedPose, setSelectedPose] = useState<string | null>(null)
  const [generatedImages, setGeneratedImages] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  // 실행 버튼: 자동으로 변환 + 메인 이미지 생성
  const handleExecute = async () => {
    if (!uploadedImage) {
      setError('이미지를 선택해주세요')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // 1단계: 이미지 분석 및 변환
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

      // 2단계: 대안 이미지 2개 생성 (사용자가 선택할 수 있도록)
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
      console.log('Alternative images generation response:', generateData)

      if (generateData.success && generateData.data.images.length >= 2) {
        // 대안 이미지 2개 저장
        setAlternativeImages(generateData.data.images)
        // 메인 이미지의 캐릭터 설명 저장 (포즈 생성 시 일관성 유지용)
        setMainCharacterDescription(transformData.data)
      } else {
        console.error('Image generation failed:', generateData)
        setError(generateData.error || '대안 이미지 생성 중 오류가 발생했습니다')
      }
    } catch (err: any) {
      console.error('Execute error:', err)
      setError(`실행 중 오류가 발생했습니다: ${err.message || 'Unknown error'}`)
    } finally {
      setIsProcessing(false)
    }
  }

  // 메인 이미지와 일관된 포즈 변형 5개 자동 생성
  const generateMultipleImagesWithVariations = async (characterDesc: string) => {
    try {
      const response = await fetch('/api/character/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterDescription: characterDesc, // 메인 이미지와 동일한 캐릭터 설명
          count: 5,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedImages(data.data.images)
      } else {
        setError(data.error || '이미지 생성 중 오류가 발생했습니다')
      }
    } catch (err) {
      setError('이미지 생성 중 오류가 발생했습니다')
    }
  }

  // 포즈 적용 버튼: 선택된 포즈로 5개 이미지 생성 (메인 이미지 일관성 유지)
  const handleApplyPose = async () => {
    if (!selectedPose) {
      setError('포즈를 선택해주세요')
      return
    }

    if (!mainCharacterDescription) {
      setError('먼저 실행 버튼을 눌러주세요')
      return
    }

    if (!mainImage) {
      setError('메인 이미지가 없습니다')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // 메인 이미지의 캐릭터 설명을 기준으로 포즈만 변경하여 5개 이미지 생성
      await generateMultipleImagesWithPose(selectedPose)
    } catch (err) {
      setError('포즈 생성 중 오류가 발생했습니다')
    } finally {
      setIsProcessing(false)
    }
  }

  // 메인 이미지 형태를 기준으로 포즈만 변경하여 이미지 생성
  const generateMultipleImagesWithPose = async (poseId: string) => {
    try {
      const pose = CHARACTER_POSES.find(p => p.id === poseId)
      if (!pose) {
        setError('잘못된 포즈 ID입니다')
        return
      }

      // 메인 이미지의 캐릭터 설명을 기준으로 선택된 포즈 적용
      const response = await fetch('/api/character/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterDescription: mainCharacterDescription, // 처음 생성된 메인 이미지의 캐릭터 설명 사용
          posePrompt: pose.prompt, // 선택된 포즈의 프롬프트
          count: 5,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedImages(data.data.images)
      } else {
        setError(data.error || '이미지 생성 중 오류가 발생했습니다')
      }
    } catch (err) {
      setError('이미지 생성 중 오류가 발생했습니다')
    }
  }

  // 대안 이미지 선택
  const handleAlternativeSelect = (index: number) => {
    setSelectedAlternativeIndex(index)
    setMainImage(alternativeImages[index])
  }

  // 선택된 이미지로 포즈 3개 생성
  const handleGeneratePoses = async () => {
    if (!selectedAlternativeIndex && selectedAlternativeIndex !== 0) {
      setError('대안 이미지를 선택해주세요')
      return
    }

    if (!transformedDescription) {
      setError('먼저 실행 버튼을 눌러주세요')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // 선택된 이미지의 스타일로 포즈 3개 생성
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
    }
  }

  const handlePoseSelect = (poseId: string) => {
    setSelectedPose(poseId)
    setGeneratedImages([])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            캐릭터 변환 & 생성
          </h1>
          <p className="text-gray-600">
            이미지를 업로드하여 메리얼 스타일로 변환하고 다양한 포즈로 생성해보세요
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-8">
          {/* Step 1: Image Upload */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">1단계: 이미지 업로드</h2>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
              disabled={isProcessing}
            />

            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Uploaded preview"
                  className="max-w-xs mx-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Step 2: Execute (Transform + Generate Main Image) */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              2단계: 실행
            </h2>
            
            <button
              onClick={handleExecute}
              disabled={!uploadedImage || isProcessing}
              className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? '실행 중...' : '실행'}
            </button>

            {transformedDescription && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">변환된 캐릭터 설명:</h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {transformedDescription}
                </p>
              </div>
            )}

            {/* 대안 이미지 2개 선택 */}
            {alternativeImages.length >= 2 && (
              <div className="mt-6">
                <h3 className="font-medium mb-4">원하는 스타일을 선택해주세요:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {alternativeImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAlternativeSelect(idx)}
                      disabled={isProcessing}
                      className={`border-2 rounded-lg p-2 transition-all ${
                        selectedAlternativeIndex === idx
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="bg-gray-100 aspect-square rounded flex items-center justify-center overflow-hidden">
                        {img && typeof img === 'object' && img.type === 'image' && (img.data || img.url) ? (
                          <img
                            src={img.url || `data:${img.mimeType || 'image/png'};base64,${img.data}`}
                            alt={`Alternative ${idx + 1}`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <div className="text-4xl mb-2">🎨</div>
                            <p className="text-sm text-gray-600 font-medium">대안 {idx + 1}</p>
                          </div>
                        )}
                      </div>
                      {selectedAlternativeIndex === idx && (
                        <p className="text-sm text-primary-600 font-medium mt-2 text-center">✓ 선택됨</p>
                      )}
                    </button>
                  ))}
                </div>
                
                {selectedAlternativeIndex !== null && (
                  <div className="mt-4">
                    <button
                      onClick={handleGeneratePoses}
                      disabled={isProcessing}
                      className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {isProcessing ? '포즈 생성 중...' : '포즈 3개 생성'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Generated Images */}
          {generatedImages.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                생성된 포즈 이미지 (3개)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedImages.map((image, index) => (
                  <div key={index} className="border rounded-lg p-2">
                    <div className="bg-gray-100 aspect-square rounded flex items-center justify-center overflow-hidden">
                      {image && typeof image === 'object' && image.type === 'image' && (image.data || image.url) ? (
                        <img
                          src={image.url || `data:${image.mimeType || 'image/png'};base64,${image.data}`}
                          alt={`Generated image ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <div className="text-4xl mb-2">🎨</div>
                          <p className="text-sm text-gray-600 font-medium">이미지 {index + 1}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {image && typeof image === 'object' && image.note ? image.note : '프롬프트가 생성되었습니다'}
                          </p>
                          {image && typeof image === 'object' && image.content && (
                            <p className="text-xs text-gray-500 mt-3 italic line-clamp-3">
                              "{image.content.substring(0, 80)}..."
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
