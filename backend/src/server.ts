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

// CORS 설정 - 모든 origin 허용 (개발 중)
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// 파일 업로드를 위한 크기 제한 설정
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 폴백용 정적 파일 서빙 (Supabase 실패 시 로컬 이미지 제공)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 라우터 설정
app.use("/api/users", userRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/drip", dripRouter);
app.use("/api/search", searchRouter);
app.use("/api/freeBoard", freeBoardRouter);
app.use("/api/reports", reportRouter);

// 서버 실행
app.listen(port, async () => {
  console.log(`🚀 서버가 포트 ${port}에서 실행 중입니다.`);
  
  try {
    // 데이터베이스 연결 테스트
    console.log('🗄️  데이터베이스 연결 테스트 중...');
    const dbConnected = await testDatabaseConnection();
    
    // Supabase 연결 테스트
    console.log('🔗 Supabase Storage 연결 테스트 중...');
    const supabaseConnected = await testSupabaseConnection();
    
    if (dbConnected && supabaseConnected) {
      console.log('✅ 모든 서비스가 정상적으로 시작되었습니다.');
    } else {
      if (!dbConnected) {
        console.log('❌ 데이터베이스 연결에 문제가 있습니다.');
      }
      if (!supabaseConnected) {
        console.log('⚠️  Supabase Storage 연결에 문제가 있습니다. 이미지 업로드가 작동하지 않을 수 있습니다.');
      }
    }
  } catch (error) {
    console.error('❌ 서버 시작 중 오류 발생:', error);
    console.log('⚠️  서버는 시작되었지만 일부 서비스에 문제가 있을 수 있습니다.');
  }
});

// 서버 종료 시 DB 커넥션 풀 정리
process.on("SIGINT", async () => {
  // console.log("서버 종료: DB 커넥션 풀 정리 중...");
  await pool.end();
  process.exit();
});
process.on("SIGTERM", async () => {
  // console.log("서버 종료: DB 커넥션 풀 정리 중...");
  await pool.end();
  process.exit();
});
