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
  getFollowStatusController,
  postToggleFollowController,
  getFollowersController,
  getFollowingController,
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

// 팔로우 관련 라우트
router.get("/follow/status", getFollowStatusController); // 팔로우 상태 확인
router.post("/follow/toggle", postToggleFollowController); // 팔로우/언팔로우 토글
router.get("/followers", getFollowersController); // 팔로워 목록
router.get("/following", getFollowingController); // 팔로잉 목록

export default router;
