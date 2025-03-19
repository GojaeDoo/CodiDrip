import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "../src/router/userRouter";
import path from "path"; // 경로 관련 모듈을 추가

dotenv.config();

const app = express();
const port = process.env.PORT || 3002; // 기본 포트를 3002로 변경

// 미들웨어 설정
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// 정적 파일 서빙 설정
app.use(
  "/images",
  express.static(path.join("/Users/choihyeonmin/Desktop/images"))
);

// 사용자
app.use("/api/users", userRouter);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
