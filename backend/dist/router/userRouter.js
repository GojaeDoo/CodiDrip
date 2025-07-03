"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/router/userRouter.ts
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
// 사용자 관련 라우트
router.get("/", userController_1.getUsers); // 사용자 목록 가져오기
router.get("/check-id", userController_1.getIdOverlappingCheckController); // 아이디 중복 체크
router.get("/check-email", userController_1.getEmailOverlappingCheckController); // 이메일 중복 체크
router.get("/find-id", userController_1.getFindIdController); // 아이디 찾기
router.get("/find-password", userController_1.getFindPasswordController); // 비밀번호 찾기
router.get("/select_user", userController_1.getSelectUser); // 사용자 선택
router.post("/login", userController_1.postLoginUserController); // 로그인
router.post("/", userController_1.postUserJoinController); // 사용자 회원가입
router.post("/verify-password-code", userController_1.postVerifyPasswordCodeController); // 비밀번호 코드 검증
router.post("/reset-password", userController_1.postUserResetPasswordController); // 비밀번호 재설정
// 팔로우 관련 라우트
router.get("/follow/status", userController_1.getFollowStatusController); // 팔로우 상태 확인
router.post("/follow/toggle", userController_1.postToggleFollowController); // 팔로우/언팔로우 토글
router.get("/followers", userController_1.getFollowersController); // 팔로워 목록
router.get("/following", userController_1.getFollowingController); // 팔로잉 목록
// 관리자 상태 확인 라우트
router.get("/admin-status", userController_1.checkUserAdminStatusController); // 사용자 관리자 상태 확인
exports.default = router;
