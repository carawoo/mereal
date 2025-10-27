/**
 * 캐릭터 스타일 설정
 * 메리얼 서비스의 고정된 캐릭터 스타일 프롬프트
 */

export interface CharacterStyle {
  name: string
  description: string
  prompt: string
  traits: string[]
}

/**
 * 메리얼의 고정 캐릭터 스타일
 * 첨부된 이미지 기준으로 정의된 스타일
 */
export const MEREL_CHARACTER_STYLE: CharacterStyle = {
  name: '메리얼 스타일',
  description: '첨부된 이미지 기반의 챙키 애니메이션 스타일, 파스텔 톤 과오리 캐릭터 스타일',
  traits: [
    '챙키(cartoonish) 스타일의 귀여운 애니메이션',
    '부드러운 파스텔 색상 팔레트',
    '깔끔한 다크 아웃라인',
    '검은점 눈과 핑크 볼 도장',
    '심플하면서 표현적인 얼굴 특징',
    '현대적이고 세련된 일러스트',
    '일관된 캐릭터 비율 유지',
    '미니멀한 부드러운 음영'
  ],
  prompt: `
    Simple cute cartoon character, minimalist flat design, thick dark brown outlines, completely flat pure colors no shading no gradients no shadows, round chubby body, very small black circular dot eyes, light pink circular blush on cheeks, colors: cream white body, warm orange beak and feet, dark brown outlines, white background, kawaii style
  `.trim()
}

/**
 * 캐릭터 변환 프롬프트 생성
 * 업로드된 이미지를 메리얼 스타일로 변환
 */
export function generateStyleTransformationPrompt(
  originalImageDescription: string,
  additionalInstructions?: string
): string {
  return `
    Transform the uploaded character image into the Mereal style while maintaining the core character features.
    
    Original character: ${originalImageDescription}
    ${additionalInstructions ? `\nAdditional instructions: ${additionalInstructions}` : ''}
    
    Apply the following style transformation:
    ${MEREL_CHARACTER_STYLE.prompt}
    
    Important:
    - Maintain the character's distinctive features and identity
    - Keep the color palette in pastel tones
    - Simplify complex details while preserving character essence
    - Ensure the transformation is natural and cohesive
  `.trim()
}

/**
 * 포즈별 프롬프트 생성
 * 선택한 포즈로 캐릭터를 재생성
 */
export interface CharacterPose {
  id: string
  name: string
  description: string
  prompt: string
}

export const CHARACTER_POSES: CharacterPose[] = [
  {
    id: 'wave',
    name: '반갑게 인사',
    description: '자연스러운 인사 포즈',
    prompt: 'character making friendly greeting gesture appropriate to its species, cheerful and friendly expression'
  },
  {
    id: 'happy',
    name: '기분 좋은 표정',
    description: '행복하고 즐거워하는 자연스러운 표정',
    prompt: 'character showing natural happiness expression, cheerful and bright expression, natural animal pose'
  },
  {
    id: 'curious',
    name: '호기심 많게',
    description: '고개를 기울여 주변을 관찰하는 자연스러운 포즈',
    prompt: 'character tilting head curiously, looking around with interest, inquisitive expression, species-appropriate curiosity pose'
  },
  {
    id: 'playing_ball',
    name: '공놀이하기',
    description: '장난감 공을 물거나 가지고 노는 모습',
    prompt: 'character playing with a ball in a way appropriate to its species, playful and happy expression, natural playing pose'
  },
  {
    id: 'eating_food',
    name: '먹이 먹는 중',
    description: '먹이를 먹는 자연스러운 모습',
    prompt: 'character eating food in a natural way appropriate to its species, cute eating pose'
  },
  {
    id: 'meme_pose',
    name: '유명한 짤 따라하기',
    description: '인기 있는 동물 짤의 포즈를 재현',
    prompt: 'character doing a meme-style famous pose, silly cute expression, exaggerated funny position, trendy viral animal pose, humorous and adorable'
  }
]

export function generatePosePrompt(
  characterDescription: string,
  poseId: string,
  style: string
): string {
  const pose = CHARACTER_POSES.find(p => p.id === poseId)
  if (!pose) {
    throw new Error(`Unknown pose ID: ${poseId}`)
  }

  return `
    Create the character in a "${pose.name}" pose (${pose.description}).
    
    Character description: ${characterDescription}
    Character style: ${style}
    
    Pose details: ${pose.prompt}
    
    Requirements:
    - Maintain character consistency from previous images
    - Keep the same character appearance and features
    - Apply the Mereal style consistently
    - The pose should be natural and expressive
    - Generate high quality character illustration
  `.trim()
}
