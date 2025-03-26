// src/router/userRouter.ts
import { Router } from "express";
import {
  getIdOverlappingCheck,
  getUsers,
  postUserJoin,
} from "../controller/userController";

const router = Router();

router.get("/", getUsers); // 사용자 목록 가져오기
router.get("/check-id", getIdOverlappingCheck); // 아이디 중복 체크

router.post("/", postUserJoin); // 사용자 회원가입

export default router;
