import express, { RequestHandler } from "express";
import {
  createDrip,
  getPostNoDrip,
  getUserDrip,
  updateDrip,
  getDripPostCommentController,
} from "../controller/dripController";

const router = express.Router();

// Drip 생성
router.post("/", createDrip as RequestHandler);

// 사용자별 Drip 조회
router.get("/", getUserDrip as RequestHandler);

// Drip 조회
router.get("/:postNo", getPostNoDrip as RequestHandler);

// Drip 수정
router.put("/:postNo", updateDrip as RequestHandler);

// Drip 댓글 조회 (게시물 ID를 경로 파라미터로 사용)
router.get("/:postNo/comments", getDripPostCommentController as RequestHandler);

export default router;
