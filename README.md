# Mereal (메리얼) - B2C 굿즈 서비스

프리미엄 굿즈 제작 서비스 Mereal의 웹 애플리케이션입니다.

## 주요 기능

### 사용자 기능
- **회원가입/로그인/로그아웃/회원탈퇴** - Supabase Auth 기반 인증 시스템
- **파일 업로드** - PDF, PSD, AI, PNG, JPG, JPEG 파일 지원 (최대 10MB, A3 사이즈)
- **주문 및 결제** - 토스페이먼츠 연동을 통한 안전한 결제
- **마이페이지** - 주문 내역 조회, 배송 추적, 계정 관리
- **모바일 최적화** - 반응형 디자인과 PWA 지원

### 관리자 기능
- **주문 관리** - 모든 주문 조회, 상태 변경, 관리자 메모
- **작업 진행 상태 관리** - 결제 대기 → 제작 중 → 완료 → 배송 완료
- **통계 대시보드** - 주문 현황, 매출 분석
- **파일 관리** - 업로드된 파일 확인 및 다운로드

## 기술 스택

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Payment**: 토스페이먼츠 (Toss Payments)
- **File Storage**: Supabase Storage
- **AI**: Google AI Studio (Gemini)
- **Deployment**: Vercel (권장)

## 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd 메리얼-makeReal
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Toss Payments Configuration
NEXT_PUBLIC_TOSS_CLIENT_KEY=your_toss_client_key_here
TOSS_SECRET_KEY=your_toss_secret_key_here

# Application Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,psd,ai,png,jpg,jpeg

# Google AI Studio Configuration
GOOGLE_AI_STUDIO_API_KEY=your_google_ai_studio_api_key_here
```

### 4. 데이터베이스 설정
Supabase 프로젝트에서 `database/schema.sql` 파일의 SQL을 실행하여 데이터베이스 스키마를 생성하세요.

### 5. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── admin/             # 관리자 페이지
│   ├── api/               # API 라우트
│   ├── login/             # 로그인 페이지
│   ├── signup/            # 회원가입 페이지
│   ├── upload/            # 파일 업로드 페이지
│   ├── payment/           # 결제 페이지
│   └── mypage/            # 마이페이지
├── components/            # 재사용 가능한 컴포넌트
├── contexts/              # React Context (인증 등)
├── hooks/                 # 커스텀 훅
├── lib/                   # 유틸리티 함수 및 서비스
└── types/                 # TypeScript 타입 정의
```

## 주요 페이지

### 사용자 페이지
- `/` - 메인 홈페이지
- `/login` - 로그인
- `/signup` - 회원가입
- `/upload` - 파일 업로드 및 주문
- `/payment` - 결제 페이지
- `/payment/success` - 결제 성공
- `/payment/fail` - 결제 실패
- `/mypage` - 마이페이지

### 관리자 페이지
- `/admin` - 관리자 대시보드
- `/admin/orders` - 주문 관리
- `/admin/orders/[id]` - 주문 상세

## 배포

### Vercel 배포 (권장)
1. Vercel 계정에 프로젝트 연결
2. 환경 변수 설정
3. 자동 배포

### 기타 플랫폼
Next.js가 지원하는 모든 플랫폼에 배포 가능합니다.

## 환경 설정

### Supabase 설정
1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. `database/schema.sql` 실행
3. Storage 버킷 'uploads' 생성
4. RLS 정책 활성화

### 토스페이먼츠 설정
1. [토스페이먼츠](https://developers.tosspayments.com) 개발자 등록
2. 클라이언트 키와 시크릿 키 발급
3. 웹훅 URL 설정

### Google AI Studio 설정
1. [Google AI Studio](https://aistudio.google.com) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. API 키 생성 및 복사
4. `.env.local` 파일에 `GOOGLE_AI_STUDIO_API_KEY` 설정

## 주의사항

- 프로덕션 환경에서는 반드시 HTTPS 사용
- 환경 변수를 안전하게 관리
- 파일 업로드 크기 제한 확인
- 결제 테스트는 토스페이먼츠 테스트 환경 사용

## 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 지원

문의사항이 있으시면 다음으로 연락주세요:
- 이메일: support@mereal.co.kr
- 전화: 1588-0000
