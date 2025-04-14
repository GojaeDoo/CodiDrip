import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "../src/router/userRouter";
import profileRouter from "../src/router/profileRouter";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

// 미들웨어 설정 하는 곳
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3004"] }));
app.use(express.json());

// 정적 파일 서빙 설정임
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  "/uploads/profiles",
  express.static(path.join(__dirname, "uploads/profiles"))
);

// 라우터 설정 하는 곳
app.use("/api/users", userRouter);

app.use("/api/profiles", profileRouter);

// 서버 실행 하는 곳
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
