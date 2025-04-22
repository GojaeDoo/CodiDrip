import { Router } from "express";
import {
  getUsers,
  getIdOverlappingCheck,
  getEmailOverlappingCheck,
  getFindId,
  getFindPassword,
  postUserJoin,
  loginUserController,
  verifyPasswordCodeController,
} from "../controller/userController";

const router = Router();

// 사용자 관련 라우트
router.get("/users", getUsers);
router.get("/id-check", getIdOverlappingCheck);
router.get("/email-check", getEmailOverlappingCheck);
router.get("/find-id", getFindId);
router.get("/find-password", getFindPassword);
router.post("/join", postUserJoin);
router.post("/login", loginUserController);
router.post("/verify-password-code", verifyPasswordCodeController);

export default router;
