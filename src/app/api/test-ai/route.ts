import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY

const genAI = apiKey && apiKey !== 'gen-lang-client-0954910000'
  ? new GoogleGenerativeAI(apiKey)
  : null

export async function GET(request: NextRequest) {
  try {
    if (!genAI) {
      return NextResponse.json({
        success: false,
        error: 'API 키가 설정되지 않았습니다'
      })
    }

    // 간단한 테스트
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const result = await model.generateContent('Hello, say hi in Korean')
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      success: true,
      message: 'API 작동 정상',
      testResult: text,
      apiKeyExists: !!apiKey
    })

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || '테스트 중 오류 발생',
      details: error.toString()
    }, { status: 500 })
  }
}

