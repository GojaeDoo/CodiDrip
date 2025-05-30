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
  updateDripPostCommentController,
  likeDripPostCommentController,
  unlikeDripPostCommentController,
  postDripPostReplyController,
  likeDripPostController,
  unlikeDripPostController,
  getDripPostLikeStatusController
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

// Drip 댓글 수정
router.put("/comments/:commentId", updateDripPostCommentController as RequestHandler);

// Drip 댓글 삭제
router.delete("/comments/:commentId", deleteDripPostCommentController as RequestHandler);

// Drip 댓글 좋아요
router.post("/comments/:commentId/like", likeDripPostCommentController as RequestHandler);

// Drip 댓글 좋아요 취소
router.delete("/comments/:commentId/like", unlikeDripPostCommentController as RequestHandler);

// Drip 대댓글 작성
router.post("/comments/:commentId/replies", postDripPostReplyController as RequestHandler);

// Drip 게시글 좋아요
router.post("/:postNo/like", likeDripPostController as RequestHandler);

// Drip 게시글 좋아요 취소
router.delete("/:postNo/like", unlikeDripPostController as RequestHandler);

// Drip 게시글 좋아요 상태 조회
router.get("/like-status", getDripPostLikeStatusController as RequestHandler);

export default router;
