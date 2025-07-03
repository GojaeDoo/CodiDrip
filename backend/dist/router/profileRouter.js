"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = require("../controller/profileController");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
// 모든 프로필 가져오기
router.get("/", profileController_1.getProfilesController);
// 특정 프로필 가져오기
router.get("/:id", profileController_1.getProfileController);
// user_id로 프로필 가져오기
router.get("/user/:id", profileController_1.getUserProfileController);
// 닉네임 중복확인
router.get("/nicknameCheck/:nickname", profileController_1.getNicknameCheckController);
// 프로필 생성
router.post("/createProfile", profileController_1.getCreateProfileController);
// 프로필 수정
router.put("/updateProfile/:userId", profileController_1.postUpdateProfileController);
// Supabase Storage를 사용한 이미지 업로드
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(), // 메모리에 저장
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB 제한
    },
});
router.post("/upload", upload.single("profileImage"), profileController_1.uploadProfileImageController);
exports.default = router;
