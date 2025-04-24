// src/router/userRouter.ts
import express from "express";
import {
  getIdOverlappingCheck,
  getUsers,
  postUserJoin,
  getEmailOverlappingCheck,
  loginUserController,
  getFindId,
  getFindPassword,
  verifyPasswordCodeController,
  getSelectUser,
  postUserResetPassword,
} from "../controller/userController";

const router = express.Router();

// 사용자 관련 라우트
router.get("/", getUsers); // 사용자 목록 가져오기
router.get("/check-id", getIdOverlappingCheck); // 아이디 중복 체크
router.get("/check-email", getEmailOverlappingCheck); // 이메일 중복 체크
router.get("/find-id", getFindId); // 아이디 찾기
router.get("/find-password", getFindPassword); // 비밀번호 찾기
router.get("/select_user", getSelectUser); // 사용자 선택

router.post("/login", loginUserController); // 로그인
router.post("/", postUserJoin); // 사용자 회원가입
router.post("/verify-password-code", verifyPasswordCodeController); // 비밀번호 코드 검증
router.post("/reset-password", postUserResetPassword); // 비밀번호 재설정

export default router;
