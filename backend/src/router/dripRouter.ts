import express, { RequestHandler } from "express";
import {
  createDrip,
  getPostNoDrip,
  getUserDrip,
  updateDrip,
  getDripPostCommentController,
  postDripPostCommentController,
  deleteDrip,
  getDripPostRepliesController,
  deleteDripPostCommentController,
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

// Drip 삭제
router.delete("/:postNo", deleteDrip as RequestHandler);

// Drip 댓글 조회
router.get("/:postNo/comments", getDripPostCommentController as RequestHandler);

// Drip 댓글 작성
router.post("/:postNo/comments", postDripPostCommentController as RequestHandler);

// Drip 답글 조회
router.get("/comments/:commentId/replies", getDripPostRepliesController as RequestHandler);

// Drip 댓글 삭제
router.delete("/comments/:commentId", deleteDripPostCommentController as RequestHandler);

export default router;
