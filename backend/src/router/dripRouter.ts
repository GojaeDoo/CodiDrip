import express, { RequestHandler } from "express";
import {
  postCreateDripController,
  getPostNoDripController,
  getUserDripController,
  postUpdateDripController,
  getDripPostCommentController,
  postDripPostCommentController,
  deleteDripController,
  getDripPostRepliesController,
  deleteDripPostCommentController,
  updateDripPostCommentController,
  likeDripPostCommentController,
  unlikeDripPostCommentController,
  postDripPostReplyController,
  likeDripPostController,
  unlikeDripPostController,
  getDripPostLikeStatusController,
  saveDripPostController,
  getDripPostSaveStatusController
} from "../controller/dripController";

const router = express.Router();

// Drip 게시글

// Drip 생성
router.post("/", postCreateDripController as RequestHandler);

// 사용자별 Drip 조회
router.get("/", getUserDripController as RequestHandler);

// Drip 게시글 좋아요 상태 조회
router.get("/like-status", getDripPostLikeStatusController as RequestHandler);

// Drip 조회
router.get("/:postNo", getPostNoDripController as RequestHandler);

// Drip 수정
router.put("/:postNo", postUpdateDripController as RequestHandler);

// Drip 삭제
router.delete("/:postNo", deleteDripController as RequestHandler);

// Drip 게시글 좋아요
router.post("/:postNo/like", likeDripPostController as RequestHandler);

// Drip 게시글 좋아요 취소
router.delete("/:postNo/like", unlikeDripPostController as RequestHandler);

// Drip 게시글 저장
router.post("/:postNo/save", saveDripPostController as RequestHandler);

// Drip 게시글 저장 상태 확인
router.get("/:postNo/save-status", getDripPostSaveStatusController as RequestHandler);

// Drip 댓글

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


export default router;
