"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const profileRouter_1 = __importDefault(require("./router/profileRouter"));
const dripRouter_1 = __importDefault(require("./router/dripRouter"));
const searchRouter_1 = __importDefault(require("./router/searchRouter"));
const freeBoardRouter_1 = __importDefault(require("./router/freeBoardRouter"));
const reportRouter_1 = __importDefault(require("./router/reportRouter"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const supabase_1 = require("./supabase");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3005;
// CORS 설정
app.use((0, cors_1.default)({
    origin: "https://codidrip.onrender.com", // 프론트엔드 URL
    credentials: true,
}));
// 파일 업로드를 위한 크기 제한 설정
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
// 폴백용 정적 파일 서빙 (Supabase 실패 시 로컬 이미지 제공)
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// 라우터 설정
app.use("/api/users", userRouter_1.default);
app.use("/api/profiles", profileRouter_1.default);
app.use("/api/drip", dripRouter_1.default);
app.use("/api/search", searchRouter_1.default);
app.use("/api/freeBoard", freeBoardRouter_1.default);
app.use("/api/reports", reportRouter_1.default);
// 서버 실행
app.listen(port, async () => {
    console.log(`🚀 서버가 포트 ${port}에서 실행 중입니다.`);
    // Supabase 연결 테스트
    console.log('🔗 Supabase Storage 연결 테스트 중...');
    const isConnected = await (0, supabase_1.testSupabaseConnection)();
    if (isConnected) {
        console.log('✅ 모든 서비스가 정상적으로 시작되었습니다.');
    }
    else {
        console.log('⚠️  Supabase Storage 연결에 문제가 있습니다. 이미지 업로드가 작동하지 않을 수 있습니다.');
    }
});
// 서버 종료 시 DB 커넥션 풀 정리
process.on("SIGINT", async () => {
    // console.log("서버 종료: DB 커넥션 풀 정리 중...");
    await db_1.pool.end();
    process.exit();
});
process.on("SIGTERM", async () => {
    // console.log("서버 종료: DB 커넥션 풀 정리 중...");
    await db_1.pool.end();
    process.exit();
});
