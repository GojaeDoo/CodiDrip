import express from "express";
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
router.get("/", getProfiles);

// 특정 프로필 가져오기
router.get("/:id", getProfile);

// user_id로 프로필 가져오기
router.get("/user/:id", getUserProfile);

// 프로필 생성
router.post("/createProfile", getCreateProfileController);

// 이미지 업로드
const uploadDir = path.join(__dirname, "../../public/images/profile");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("profileImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "파일이 없습니다." });
  }
  res.json({ imagePath: `/images/profile/${req.file.filename}` });
});

export default router;
