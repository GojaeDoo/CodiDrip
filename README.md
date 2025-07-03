# CodiDrip

패션 커뮤니티 플랫폼

## 기술 스택

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL (Supabase)
- Supabase Storage

## 환경 설정

### 1. Supabase 설정

1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. Storage 버킷 생성:
   - `profiles` (프로필 이미지용)
   - `drips` (드립 이미지용)
3. 각 버킷 설정:
   - Public: true
   - File size limit: 50MB
   - Allowed MIME types: image/*

### 2. 환경변수 설정

#### Backend (.env)
```env
# Database
DATABASE_URL="your_database_url"

# Supabase
SUPABASE_URL="your_supabase_project_url"
SUPABASE_ANON_KEY="your_supabase_anon_key"

# JWT
JWT_SECRET="your_jwt_secret"

# Server
PORT=3005
```

## 설치 및 실행

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 이미지 마이그레이션

기존 로컬 이미지를 Supabase Storage로 마이그레이션:

```bash
cd backend
npm run migrate-images
```

마이그레이션 완료 후 기존 로컬 이미지 정리:

```bash
npm run cleanup-images
```

## 주요 기능

- 사용자 인증 (회원가입/로그인)
- 프로필 관리
- 드립 게시글 작성/조회
- 이미지 업로드 (Supabase Storage)
- 좋아요/댓글 기능
- 자유게시판
- 신고 시스템

## 파일 구조

```
CodiDrip/
├── backend/
│   ├── src/
│   │   ├── controller/     # 컨트롤러
│   │   ├── service/        # 비즈니스 로직
│   │   ├── storage/        # 데이터베이스 접근
│   │   ├── router/         # 라우터
│   │   ├── utils/          # 유틸리티
│   │   └── scripts/        # 마이그레이션 스크립트
│   └── uploads/            # 로컬 이미지 (마이그레이션 후 삭제)
└── frontend/
    ├── src/
    │   ├── app/            # Next.js 페이지
    │   ├── component/      # React 컴포넌트
    │   ├── context/        # React Context
    │   └── utils/          # 유틸리티
    └── public/             # 정적 파일
``` 