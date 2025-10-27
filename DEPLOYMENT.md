# Mereal 배포 가이드

## 🚀 GitHub 저장소 생성 및 연결

### 1. GitHub에서 새 저장소 생성
1. [GitHub](https://github.com)에 로그인
2. "New repository" 클릭
3. Repository name: `mereal-service` (또는 원하는 이름)
4. Description: `Mereal B2C 굿즈 서비스`
5. Public/Private 선택
6. "Create repository" 클릭

### 2. 로컬 저장소를 GitHub에 연결
```bash
# GitHub 저장소 URL로 원격 저장소 추가 (예시)
git remote add origin https://github.com/YOUR_USERNAME/mereal-service.git

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

## 🌐 Vercel 배포 (권장)

### 1. Vercel 계정 생성
1. [Vercel](https://vercel.com) 방문
2. GitHub 계정으로 로그인

### 2. 프로젝트 배포
1. "New Project" 클릭
2. GitHub 저장소 선택 및 Import
3. Framework Preset: "Next.js" 자동 감지
4. "Deploy" 클릭

### 3. 환경 변수 설정
Vercel Dashboard → Settings → Environment Variables에서 다음 변수들을 추가:

#### Supabase 설정
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon public key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key

#### 토스페이먼츠 설정
- `NEXT_PUBLIC_TOSS_CLIENT_KEY`: 토스페이먼츠 클라이언트 키
- `TOSS_SECRET_KEY`: 토스페이먼츠 시크릿 키

#### 기타 설정
- `NEXTAUTH_SECRET`: 랜덤 시크릿 키 (32자 이상)
- `NEXTAUTH_URL`: 배포된 도메인 URL (예: https://mereal.real-e.space)

#### Google AI Studio 설정
- `GOOGLE_AI_STUDIO_API_KEY`: Google AI Studio API 키

## 🗄️ Supabase 설정

### 1. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com) 로그인
2. "New project" 생성
3. 프로젝트 설정 완료

### 2. 데이터베이스 스키마 생성
1. Supabase Dashboard → SQL Editor
2. `database/schema.sql` 파일 내용을 복사하여 실행
3. 모든 테이블과 함수가 생성되었는지 확인

### 3. Storage 설정
1. Storage → Create bucket
2. Bucket name: `uploads`
3. Public bucket: `false` (비공개)
4. RLS 정책 자동 적용됨

### 4. Authentication 설정
1. Authentication → Settings
2. Site URL: `https://mereal.real-e.space` 추가
3. Redirect URLs: 
   - `https://mereal.real-e.space/auth/callback`
   - `http://localhost:3000/auth/callback` (개발용)

## 💳 토스페이먼츠 설정

### 1. 개발자 등록
1. [토스페이먼츠 개발자센터](https://developers.tosspayments.com) 방문
2. 계정 생성 및 사업자 등록
3. API 키 발급

### 2. 웹훅 설정
- Success URL: `https://mereal.real-e.space/payment/success`
- Fail URL: `https://mereal.real-e.space/payment/fail`
- Webhook URL: `https://mereal.real-e.space/api/payments/webhook`

## 👨‍💼 관리자 계정 생성

### 1. 일반 사용자로 회원가입
1. 배포된 사이트에서 회원가입
2. 이메일 인증 완료

### 2. 관리자 권한 부여
Supabase Dashboard → Table Editor → `admins` 테이블에서:
```sql
INSERT INTO public.admins (user_id, role, permissions)
VALUES (
  'USER_UUID_HERE', 
  'super_admin', 
  '["view_orders", "update_orders", "manage_admins", "view_analytics"]'
);
```

## 🔧 도메인 설정 (선택사항)

### Vercel에서 커스텀 도메인 연결
1. Vercel Dashboard → Settings → Domains
2. 도메인 추가 및 DNS 설정
3. SSL 인증서 자동 발급

## 📊 모니터링 및 분석

### 1. Vercel Analytics
- Vercel Dashboard에서 Analytics 활성화

### 2. Supabase 모니터링
- Database → Logs에서 쿼리 성능 모니터링
- API → Logs에서 API 호출 현황 확인

## 🔒 보안 체크리스트

- [ ] 모든 환경 변수가 안전하게 설정됨
- [ ] Supabase RLS 정책이 활성화됨
- [ ] 파일 업로드 크기 제한 확인
- [ ] 결제 웹훅 보안 검증
- [ ] HTTPS 강제 적용
- [ ] CORS 설정 확인

## 🚨 문제 해결

### 빌드 에러
```bash
# 로컬에서 빌드 테스트
npm run build

# 타입 체크
npm run type-check
```

### 환경 변수 문제
- Vercel Dashboard에서 환경 변수 재확인
- 변수명 오타 체크
- 값에 따옴표나 공백 없는지 확인

### 데이터베이스 연결 문제
- Supabase 프로젝트 상태 확인
- API 키 유효성 검증
- 네트워크 연결 상태 확인

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. Vercel Deployment Logs
2. Supabase Dashboard Logs
3. 브라우저 개발자 도구 Console

---

배포 완료 후 https://your-domain.com에서 서비스를 확인할 수 있습니다! 🎉
