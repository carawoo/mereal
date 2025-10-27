import { GoogleGenerativeAI } from '@google/generative-ai'

// Google AI Studio API 키를 환경 변수에서 가져옵니다
const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY

if (!apiKey) {
  throw new Error('GOOGLE_AI_STUDIO_API_KEY is not configured in environment variables')
}

// Google AI Studio 클라이언트 초기화
const genAI = new GoogleGenerativeAI(apiKey)

/**
 * Google AI Studio 서비스 클래스
 * 텍스트 생성, 이미지 분석 등의 AI 기능을 제공합니다
 */
export class AIService {
  private model: any

  constructor(modelName: string = 'gemini-1.5-flash') {
    this.model = genAI.getGenerativeModel({ model: modelName })
  }

  /**
   * 캐릭터 이미지를 메리얼 스타일로 변환
   * @param imageData 이미지 데이터
   * @param stylePrompt 스타일 프롬프트
   * @returns 변환된 이미지에 대한 설명
   */
  async transformCharacterImage(imageData: string | Buffer, stylePrompt: string): Promise<string> {
    try {
      const imagePart = {
        inlineData: {
          data: typeof imageData === 'string' ? imageData : imageData.toString('base64'),
          mimeType: 'image/jpeg'
        }
      }

      const prompt = `
        Analyze this character image in detail and describe it, then transform it to the following style:
        
        Style: ${stylePrompt}
        
        Return a detailed description in Korean of the transformed character.
      `

      const result = await this.model.generateContent([prompt, imagePart])
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('AI character transformation error:', error)
      throw new Error('캐릭터 변환 중 오류가 발생했습니다')
    }
  }

  /**
   * 캐릭터 포즈 생성
   * @param characterDescription 캐릭터 설명
   * @param posePrompt 포즈 프롬프트
   * @returns 포즈가 적용된 캐릭터 설명
   */
  async generateCharacterPose(characterDescription: string, posePrompt: string): Promise<string> {
    try {
      const prompt = `
        Create a detailed description of this character in the specified pose:
        
        Character: ${characterDescription}
        Pose: ${posePrompt}
        
        Return a detailed description in Korean that can be used for consistent image generation.
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('AI pose generation error:', error)
      throw new Error('포즈 생성 중 오류가 발생했습니다')
    }
  }

  /**
   * 일관된 캐릭터 이미지 생성
   * @param characterDescription 캐릭터 설명
   * @param count 생성할 이미지 개수
   * @returns 생성된 이미지 프롬프트 배열
   */
  async generateConsistentImages(characterDescription: string, count: number = 5): Promise<string[]> {
    try {
      const results: string[] = []
      
      for (let i = 0; i < count; i++) {
        const prompt = `
          Create a slightly varied version of this character description:
          
          ${characterDescription}
          
          Maintain visual consistency while adding subtle variations in pose, expression, or composition.
          Return only the enhanced character description.
        `

        const result = await this.model.generateContent(prompt)
        const response = await result.response
        results.push(response.text())
      }

      return results
    } catch (error) {
      console.error('AI consistent image generation error:', error)
      throw new Error('이미지 생성 중 오류가 발생했습니다')
    }
  }

  /**
   * 텍스트 생성
   * @param prompt 생성할 텍스트의 프롬프트
   * @returns 생성된 텍스트
   */
  async generateText(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('AI text generation error:', error)
      throw new Error('텍스트 생성 중 오류가 발생했습니다')
    }
  }

  /**
   * 이미지 분석 및 설명 생성
   * @param imageData 이미지 데이터 (base64 또는 buffer)
   * @param prompt 분석 요청 프롬프트
   * @returns 이미지 분석 결과
   */
  async analyzeImage(imageData: string | Buffer, prompt: string = '이 이미지를 설명해주세요'): Promise<string> {
    try {
      // 이미지 데이터를 적절한 형식으로 변환
      const imagePart = {
        inlineData: {
          data: typeof imageData === 'string' ? imageData : imageData.toString('base64'),
          mimeType: 'image/jpeg' // 필요에 따라 동적으로 설정 가능
        }
      }

      const result = await this.model.generateContent([prompt, imagePart])
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('AI image analysis error:', error)
      throw new Error('이미지 분석 중 오류가 발생했습니다')
    }
  }

  /**
   * 굿즈 디자인 제안 생성
   * @param productType 제품 타입 (예: 티셔츠, 머그컵, 스티커 등)
   * @param theme 테마 또는 컨셉
   * @param additionalInfo 추가 정보
   * @returns 디자인 제안
   */
  async generateDesignSuggestion(
    productType: string,
    theme: string,
    additionalInfo?: string
  ): Promise<string> {
    const prompt = `
      다음 조건에 맞는 굿즈 디자인 제안을 해주세요:
      
      제품 타입: ${productType}
      테마/컨셉: ${theme}
      ${additionalInfo ? `추가 정보: ${additionalInfo}` : ''}
      
      다음 항목들을 포함해서 제안해주세요:
      1. 디자인 컨셉 설명
      2. 색상 팔레트 제안
      3. 타이포그래피 스타일
      4. 레이아웃 구성
      5. 타겟 고객층
      6. 제작 시 고려사항
      
      한국어로 상세하고 실용적인 제안을 해주세요.
    `

    return this.generateText(prompt)
  }

  /**
   * 업로드된 파일 내용 분석
   * @param fileContent 파일 내용 또는 설명
   * @param fileType 파일 타입
   * @returns 분석 결과 및 개선 제안
   */
  async analyzeUploadedFile(fileContent: string, fileType: string): Promise<string> {
    const prompt = `
      업로드된 ${fileType} 파일을 분석해주세요:
      
      파일 내용/설명: ${fileContent}
      
      다음 항목들을 분석해주세요:
      1. 디자인 품질 평가
      2. 인쇄 적합성 검토
      3. 개선 제안사항
      4. 예상 제작 난이도
      5. 추천 제품 타입
      
      전문적이고 건설적인 피드백을 한국어로 제공해주세요.
    `

    return this.generateText(prompt)
  }
}

// 기본 AI 서비스 인스턴스 생성
export const aiService = new AIService()

// 타입 정의
export interface DesignAnalysis {
  quality: 'excellent' | 'good' | 'fair' | 'poor'
  printability: 'high' | 'medium' | 'low'
  suggestions: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  recommendedProducts: string[]
}

export interface AIResponse {
  success: boolean
  data?: string
  error?: string
}
