import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY
const genAI = apiKey && apiKey !== 'gen-lang-client-0954910000'
  ? new GoogleGenerativeAI(apiKey)
  : null

interface GenerateRequest {
  characterDescription: string
  posePrompt?: string
  count?: number
}

/**
 * Gemini 2.5 Flash Image (Nano Banana) 사용한 캐릭터 이미지 생성
 */
export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json()
    const { characterDescription, posePrompt, count = 5 } = body

    if (!characterDescription) {
      return NextResponse.json(
        { success: false, error: '캐릭터 설명이 필요합니다' },
        { status: 400 }
      )
    }

    const images: any[] = []
    const merealSystemPrompt = `You are a Mereal character artist. Create simplified, cute, flat cartoon pet characters.

STYLE RULES:
1. Character proportions: Body MUST be LARGER than head. Head is PROPORTIONALLY SMALL (head small, body large). NOT chibi, NOT big head. Natural animal proportions where body is dominant. Head connects directly to body, no separate neck area.
2. Eyes: Tiny solid black circles ONLY - absolutely no white, no highlights, no reflections, no shine, no pupils.
3. Outlines: VERY THICK borders (1.5x thicker than normal, bold and prominent) uniform thickness around all parts. Border color should be 30% darker than adjacent color (for light colors use dark brown, for dark colors use darker shade).
4. Colors: Completely flat solid colors - no gradients, no shadows, no highlights, no shading, no 3D effects, no depth.
5. Facial features: Small circular pink blush marks on cheeks (flat pink circles, no highlights).
6. Wings/feathers: Show wing patterns and colors as flat colored shapes (simplified, not detailed feathers). NO fur texture lines inside body, NO individual hair strands. Just completely smooth flat colored areas.
7. Species features: Show basic species shape (body, beak, feet, ears, wing patterns) BUT keep it VERY SIMPLE. NO complex details, NO intricate features. Rounded and smooth all sharp edges (beak, claws, ears) - make pointed parts slightly rounded and soft. Minimal simple shapes only.
8. Background: Plain white ONLY - no hands, no microphones, no accessories, no decorations, no props, no objects, NO branches, NO perches, NO tree-like elements.
9. Overall: Simple, cute, flat cartoon style - like a sticker with accurate animal features but simplified flat colors.

CRITICAL: Small head, pure black eyes, flat colors, white background only.

IMPORTANT: When creating variations or different poses of the same character, maintain IDENTICAL species, breed, colors, body shape, size, all features, and proportions. Only the pose/position should change.`

    // Gemini 2.5 Flash Image API 직접 호출 (nano banana 설정 적용)
    if (apiKey && apiKey !== 'gen-lang-client-0954910000') {
      const maxRetries = 2
      for (let i = 0; i < count; i++) {
        let retryCount = 0
        let validImage = false
        
        while (retryCount <= maxRetries && !validImage) {
          try {
            const response = await fetch(
              'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-goog-api-key': apiKey
                },
                body: JSON.stringify({
                  systemInstruction: {
                    parts: [{ text: merealSystemPrompt }]
                  },
                  contents: [{
                    parts: [{
                      text: `Create this character: ${characterDescription}

Style: Cute simplified flat cartoon
- Body MUST be LARGER than head. Head is PROPORTIONALLY SMALL (head small, body large). NOT chibi, NOT big head. Body dominant, natural animal proportions. Head connects directly to body (no separate neck)
- Eyes: tiny solid black circles (no white, no highlights, no reflections)
- VERY THICK borders (1.5x thicker, bold and prominent) uniform thickness (border color 30% darker than adjacent)
- Completely flat solid colors (no gradients, shadows, highlights, shading, depth)
- Show basic species features (body, beak, feet, ears, wing patterns) but keep it VERY SIMPLE - NO complex details, NO intricate features. Rounded and smooth all sharp edges (beak, claws, ears) - make pointed parts slightly rounded and soft. Minimal simple shapes only
- Wing patterns as flat colored shapes (simplified, not detailed, minimal lines). NO fur texture lines inside body, NO individual hair strands - just completely smooth flat colored areas
- Small circular pink blush on cheeks (flat pink, no highlights)
- Plain white background only - NO branches, NO perches, NO tree-like elements, NO objects

CRITICAL: This is the EXACT SAME CHARACTER. Maintain IDENTICAL species, breed, colors, body shape, size, features, proportions, head size, ear shape, tail shape. ONLY the body pose/position should change slightly.${i > 0 ? `\n\nVariation ${i + 1} of the same character. Same species, same breed, same colors, same size, same features, same proportions. ONLY change pose.` : ''}${posePrompt ? `\n\nPose: ${posePrompt}` : ''}`
                    }]
                  }],
                  generationConfig: {
                    temperature: 0.3,
                    topP: 0.7,
                    topK: 40,
                    maxOutputTokens: 8192
                  }
                })
              }
            )

            const data = await response.json()
            console.log('Gemini API response:', JSON.stringify(data, null, 2))

            // 응답에서 이미지 데이터 추출
            if (data.candidates && data.candidates.length > 0) {
              const parts = data.candidates[0].content.parts
              
              // inlineData가 있는 경우 (base64 이미지)
              const imagePart = parts?.find((part: any) => part.inlineData)
              if (imagePart?.inlineData) {
                const inlineData = imagePart.inlineData
                images.push({
                  type: 'image',
                  url: `data:${inlineData.mimeType};base64,${inlineData.data}`,
                  data: inlineData.data,
                  mimeType: inlineData.mimeType,
                  variation: i + 1
                })
                validImage = true
                continue
              }
            }

            // 텍스트 응답에서 URL 찾기
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
            console.log('Gemini text response:', text.substring(0, 300))
            
            const urlMatch = text.match(/https?:\/\/[^\s<>"]+/)
            if (urlMatch) {
              images.push({
                type: 'image',
                url: urlMatch[0],
                data: urlMatch[0],
                mimeType: 'image/png',
                variation: i + 1
              })
              validImage = true
            } else {
              throw new Error(`No image data found. Response: ${text.substring(0, 200)}`)
            }
          } catch (error: any) {
            console.error(`Image ${i + 1} generation error (retry ${retryCount}):`, error)
            retryCount++
            if (retryCount <= maxRetries) {
              await new Promise(resolve => setTimeout(resolve, 1000))
              continue
            } else {
              const prompt = merealSystemPrompt + `\n\nCharacter: ${characterDescription}${posePrompt ? `\nPose: ${posePrompt}` : ''}`
              images.push({
                type: 'prompt',
                content: prompt,
                variation: i + 1,
                note: `이미지 생성 실패: ${error.message || 'Unknown error'}`
              })
            }
          }
          if (validImage) {
            break
          }
        }
      }
    } else {
      // API 키 없이 프롬프트만 반환
      for (let i = 0; i < count; i++) {
        const prompt = merealSystemPrompt + `\n\nCharacter: ${characterDescription}${posePrompt ? `\nPose: ${posePrompt}` : ''}`
        images.push({
          type: 'prompt',
          content: prompt,
          variation: i + 1,
          note: 'Gemini API 키 필요'
        })
      }
    }

    const finalPrompt = merealSystemPrompt + `\n\nCharacter: ${characterDescription}${posePrompt ? `\nPose: ${posePrompt}` : ''}`
    
    return NextResponse.json({
      success: true,
      data: {
        prompt: finalPrompt,
        count: images.length,
        images: images
      }
    })

  } catch (error) {
    console.error('Character generation error:', error)
    return NextResponse.json(
      { success: false, error: '캐릭터 생성 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}