import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./router/userRouter";
import profileRouter from "./router/profileRouter";
import dripRouter from "./router/dripRouter";
import searchRouter from "./router/searchRouter";
import freeBoardRouter from "./router/freeBoardRouter";
import reportRouter from "./router/reportRouter";
import path from "path";
import { pool, testDatabaseConnection } from "./db";
import { testSupabaseConnection } from "./supabase";

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

// CORS 설정 - 프론트엔드 도메인 허용
const allowedOrigins = [
  'https://codidrip.onrender.com',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS 정책에 의해 차단됨'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Content-Length', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// OPTIONS 요청 처리
app.options('*', cors());

// 파일 업로드를 위한 크기 제한 설정
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// uploads 폴더 생성 확인
const fs = require('fs');
const uploadsDir = path.join(process.cwd(), 'uploads');
const profilesDir = path.join(uploadsDir, 'profiles');
const dripDir = path.join(uploadsDir, 'drip');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(profilesDir)) {
  fs.mkdirSync(profilesDir, { recursive: true });
}
if (!fs.existsSync(dripDir)) {
  fs.mkdirSync(dripDir, { recursive: true });
}

// 기본 이미지 파일 복사 (없는 경우)
const defaultProfilePath = path.join(profilesDir, 'default-profile.png');
if (!fs.existsSync(defaultProfilePath)) {
  try {
    const sourcePath = path.join(__dirname, '../../frontend/public/images/profile/default-profile.png');
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, defaultProfilePath);
    }
  } catch (error) {
    console.log('  기본 이미지 복사 실패:', error.message);
  }
}

// 폴백용 정적 파일 서빙 (Supabase 실패 시 로컬 이미지 제공)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"), {
  setHeaders: (res, path) => {
    res.set('Cache-Control', 'public, max-age=31536000'); // 1년 캐시
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

// 라우터 설정
app.use("/api/users", userRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/drip", dripRouter);
app.use("/api/search", searchRouter);
app.use("/api/freeBoard", freeBoardRouter);
app.use("/api/reports", reportRouter);

// 서버 실행
app.listen(port, async () => {
  
  try {
    // 데이터베이스 연결 테스트
    const dbConnected = await testDatabaseConnection();
    
    // Supabase 연결 테스트
    const supabaseConnected = await testSupabaseConnection();
  } catch (error) {
    console.error(' 서버 시작 중 오류 발생:', error);
  }
});

// 서버 종료 시 DB 커넥션 풀 정리
process.on("SIGINT", async () => {
  await pool.end();
  process.exit();
});
process.on("SIGTERM", async () => {
  await pool.end();
  process.exit();
});
