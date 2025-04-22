// src/router/userRouter.ts
import { Router } from "express";
import {
  getIdOverlappingCheck,
  getUsers,
  postUserJoin,
  getEmailOverlappingCheck,
  loginUserController,
  getFindId,
  getFindPassword,
} from "../controller/userController";

const router = Router();

router.get("/", getUsers); // 사용자 목록 가져오기
router.get("/check-id", getIdOverlappingCheck); // 아이디 중복 체크
router.get("/check-email", getEmailOverlappingCheck); // 이메일 중복 체크

router.post("/", postUserJoin); // 사용자 회원가입
router.post("/login", loginUserController); // 로그인

router.get("/find_id", getFindId); // 아이디 찾기
router.get("/find_password", getFindPassword); // 비밀번호 찾기
export default router;
