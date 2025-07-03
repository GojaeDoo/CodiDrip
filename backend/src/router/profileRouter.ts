import express, { RequestHandler } from "express";
import {
  getProfilesController,
  getProfileController,
  getUserProfileController,
  getCreateProfileController,
  postUpdateProfileController,
  getNicknameCheckController,
  uploadProfileImageController
} from "../controller/profileController";
import multer from "multer";

const router = express.Router();

// 모든 프로필 가져오기
router.get("/", getProfilesController as RequestHandler);

// 특정 프로필 가져오기
router.get("/:id", getProfileController as RequestHandler);

// user_id로 프로필 가져오기
router.get("/user/:id", getUserProfileController as RequestHandler);

// 닉네임 중복확인
router.get("/nicknameCheck/:nickname", getNicknameCheckController as RequestHandler);

// 프로필 생성
router.post("/createProfile", getCreateProfileController as RequestHandler);

// 프로필 수정
router.put(
  "/updateProfile/:userId",
  postUpdateProfileController as RequestHandler
);

// Supabase Storage를 사용한 이미지 업로드
const upload = multer({
  storage: multer.memoryStorage(), // 메모리에 저장
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB 제한
  },
});

router.post("/upload", upload.single("profileImage"), uploadProfileImageController as RequestHandler);

export default router;
