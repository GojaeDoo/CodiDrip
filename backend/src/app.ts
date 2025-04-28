import express from "express";
import cors from "cors";
import userRouter from "./router/userRouter";
import profileRouter from "./router/profileRouter";
import authRouter from "./router/authRouter";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// CORS 설정
app.use(cors());

// body-parser 설정
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 라우터 설정
app.use("/api/users", userRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/auth", authRouter);

// 에러 핸들러
app.use(errorHandler);

export default app;
