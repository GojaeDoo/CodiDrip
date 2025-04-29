import express, { RequestHandler } from "express";
import {
  getProfiles,
  getProfile,
  getUserProfile,
  getCreateProfileController,
} from "../controller/profileController";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// 모든 프로필 가져오기
router.get("/", getProfiles as RequestHandler);

// 특정 프로필 가져오기
router.get("/:id", getProfile as RequestHandler);

// user_id로 프로필 가져오기
router.get("/user/:id", getUserProfile as RequestHandler);

// 프로필 생성
router.post("/createProfile", getCreateProfileController as RequestHandler);

// 이미지 업로드
const uploadDir = path.join(__dirname, "../../uploads/profiles");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename =
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
    console.log("파일 저장:", filename);
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB 제한
  },
});

const uploadHandler: RequestHandler = (req, res) => {
  if (!req.file) {
    console.error("파일이 없습니다.");
    res.status(400).json({ error: "파일이 없습니다." });
    return;
  }
  console.log("파일 업로드 성공:", req.file.filename);
  res.json({ imagePath: req.file.filename });
};

router.post("/upload", upload.single("profileImage"), uploadHandler);

export default router;
