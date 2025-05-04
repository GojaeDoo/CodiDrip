import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./router/userRouter";
import profileRouter from "./router/profileRouter";
import dripRouter from "./router/dripRouter";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

// CORS 설정
app.use(
  cors({
    origin: "http://localhost:3000", // 프론트엔드 URL
    credentials: true,
  })
);

// 파일 업로드를 위한 크기 제한 설정
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 정적 파일 서빙 설정
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(
  "/uploads/profiles",
  express.static(path.join(__dirname, "../uploads/profiles"))
);

// 라우터 설정
app.use("/api/users", userRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/drip", dripRouter);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
