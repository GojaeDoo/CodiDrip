import express from "express";
import { getProfiles, getProfile } from "../controller/profileController";

const router = express.Router();

// 모든 프로필 가져오기
router.get("/", getProfiles);

// 특정 프로필 가져오기
router.get("/:id", getProfile);

export default router;
