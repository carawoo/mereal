import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { 
  MEREL_CHARACTER_STYLE, 
  generateStyleTransformationPrompt,
  generatePosePrompt,
  CHARACTER_POSES
} from '@/lib/characterStyle'

// 환경 변수에서 API 키 가져오기
const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY

// 임시로 API 키 없이도 작동하도록 설정
const genAI = apiKey && apiKey !== 'gen-lang-client-0954910000' 
  ? new GoogleGenerativeAI(apiKey)
  : null

/**
 * 이미지를 메리얼 스타일로 변환
 */
export async function POST(request: NextRequest) {
  try {
    console.log('Transform request received')
    const formData = await request.formData()
    const image = formData.get('image') as File
    const mode = formData.get('mode') as string // 'transform' | 'pose'
    
    console.log('Image:', image ? { name: image.name, type: image.type, size: image.size } : 'No image')
    const poseId = formData.get('poseId') as string | null
    const originalDescription = formData.get('originalDescription') as string | null

    if (!image) {
      return NextResponse.json(
        { success: false, error: '이미지가 필요합니다' },
        { status: 400 }
      )
    }

    let text = ''

    // API 키가 없는 경우 모의 응답 반환
    if (!genAI) {
      if (mode === 'transform') {
        text = `메리얼 스타일로 변환된 캐릭터 설명:

- 챙키 애니메이션 스타일의 귀여운 오리 캐릭터
- 부드러운 파스텔 색상 팔레트 적용
- 깔끔한 다크 아웃라인 사용
- 검은점 눈과 핑크 볼 도장으로 귀여운 표정
- 메리얼 스타일의 모던하고 세련된 느낌

참고: API 키가 설정되지 않아 샘플 응답을 반환합니다. 실제 AI 기능을 사용하려면 유효한 Google AI Studio API 키를 설정해주세요.`
      } else if (mode === 'pose' && poseId && originalDescription) {
        const pose = CHARACTER_POSES.find(p => p.id === poseId)
        const poseName = pose?.name || '선택한 포즈'
        text = `메리얼 스타일의 "${poseName}" 포즈로 재생성된 캐릭터:

- 기존 캐릭터의 특징을 유지하면서 ${poseName} 포즈 적용
- 일관된 메리얼 스타일 유지
- 부드러운 파스텔 색상과 깔끔한 라인아트
- ${poseName} 포즈에 맞춘 자연스러운 표현

참고: API 키가 설정되지 않아 샘플 응답을 반환합니다.`
      }
    } else {
      // 이미지를 base64로 변환
      console.log('Processing image:', image.name, image.type, image.size)
      const imageBuffer = await image.arrayBuffer()
      const base64Image = Buffer.from(imageBuffer).toString('base64')
      console.log('Image converted to base64, length:', base64Image.length)

      // Gemini 이미지 분석 모델 사용
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash' 
      })

      let prompt = ''
      let result

      if (mode === 'transform') {
        // 스타일 변환 모드
        const imagePart = {
          inlineData: {
            data: base64Image,
            mimeType: image.type
          }
        }

        prompt = `
          Analyze this pet animal image in detail and describe:
          
          1. Animal type: Dog, Cat, Bird, Rabbit, Hamster, Guinea Pig, Ferret, Fish, Reptile, etc.
          2. Specific species/breed: If it's a dog (Golden Retriever, Pomeranian, etc.), if it's a cat (Persian, Siamese, etc.), if it's a bird (parrot, canary, etc.)
          3. Size: small/medium/large relative to its species
          4. Colors: body color, head color, fur/feather patterns, eye color, nose color, paw/claw color, tail color, any distinctive markings
          5. Body shape and structure: round/oval/elongated/sleek/stocky
          6. Proportions: head size relative to body, leg length, tail length
          7. Distinctive features: ear shape and size, eye shape, nose shape, facial features, fur texture (short/long/curly), pattern/markings
          8. Pose and posture: Describe the exact pose - is it sitting, standing, lying down, or in a specific position? How are the legs/paws positioned? Where is the head oriented (facing left/right/front)? Is the body tilted or straight? What about the tail position?
          9. Unique characteristics: special markings, color patches, facial expressions
          
          Describe in Korean. Be very specific about species, breed, size, colors, body structure, pose, and unique features. Capture all details including the exact pose from the image.
        `

        try {
          console.log('Sending image to Gemini for analysis...')
          result = await model.generateContent([prompt, imagePart])
          console.log('Gemini analysis complete')
        } catch (error: any) {
          console.error('Gemini API error:', error)
          
          // Internal Server Error인 경우 재시도
          if (error.message && error.message.includes('500 Internal Server Error')) {
            console.log('Retrying after 500 error...')
            try {
              await new Promise(resolve => setTimeout(resolve, 1000)) // 1초 대기
              result = await model.generateContent([prompt, imagePart])
            } catch (retryError: any) {
              throw new Error(`이미지 분석 중 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.`)
            }
          } else {
            throw new Error(`이미지 분석 중 오류가 발생했습니다: ${error.message}`)
          }
        }
      } else if (mode === 'pose' && poseId && originalDescription) {
        // 포즈 생성 모드
        const pose = CHARACTER_POSES.find(p => p.id === poseId)
        if (!pose) {
          return NextResponse.json(
            { success: false, error: '잘못된 포즈 ID입니다' },
            { status: 400 }
          )
        }

        prompt = generatePosePrompt(
          originalDescription,
          poseId,
          MEREL_CHARACTER_STYLE.prompt
        )

        try {
          result = await model.generateContent(prompt)
        } catch (error: any) {
          console.error('Gemini API error (pose mode):', error)
          throw new Error(`포즈 생성 중 오류가 발생했습니다: ${error.message}`)
        }
      } else {
        return NextResponse.json(
          { success: false, error: '잘못된 요청입니다' },
          { status: 400 }
        )
      }

      const response = await result.response
      text = response.text()
    }

    return NextResponse.json({
      success: true,
      data: text
    })

  } catch (error: any) {
    console.error('Character transformation error:', error)
    const errorMessage = error.message || '알 수 없는 오류가 발생했습니다'
    console.error('Error details:', errorMessage)
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: error.stack 
      },
      { status: 500 }
    )
  }
}
