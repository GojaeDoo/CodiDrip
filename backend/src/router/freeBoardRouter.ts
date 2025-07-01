import express, { RequestHandler } from "express";
import { postCreateFreeBoardController, getFreeBoardListController, getFreeBoardDetailController, 
    postUpdateFreeBoardController, deleteFreeBoardController, postFreeBoardCommentController, 
    getFreeBoardCommentController, updateFreeBoardCommentController, deleteFreeBoardCommentController, 
    postFreeBoardReplyController, getFreeBoardRepliesController, getUserFreeBoardPostsController } from "../controller/freeBoardController";

const router = express.Router();

// 게시글 목록 조회
router.get("/", getFreeBoardListController as RequestHandler);

// 게시글 상세 조회
router.get("/:id", getFreeBoardDetailController as RequestHandler);

// 게시글 작성
router.post("/", postCreateFreeBoardController as RequestHandler);

// 게시글 수정
router.put("/:id", postUpdateFreeBoardController as RequestHandler);

// 게시글 삭제
router.delete("/:id", deleteFreeBoardController as RequestHandler);


// 자유게시판 게시글 댓글 작성
router.post("/comment", postFreeBoardCommentController as RequestHandler);

// 자유게시판 대댓글 작성
router.post("/comment/reply", postFreeBoardReplyController as RequestHandler);

// 자유게시판 대댓글 조회 (더 구체적인 경로를 먼저 정의)
router.get("/comment/:commentId/replies", getFreeBoardRepliesController as RequestHandler);

// 자유게시판 게시글 댓글 조회
router.get("/comment/:id", getFreeBoardCommentController as RequestHandler);

// 자유게시판 댓글 수정
router.put("/comment/:commentId", updateFreeBoardCommentController as RequestHandler);

// 자유게시판 댓글 삭제
router.delete("/comment/:commentId", deleteFreeBoardCommentController as RequestHandler);

// 자유게시판 대댓글 조회
// router.get("/replies/:commentId", getFreeBoardReplies as RequestHandler);

// 사용자가 작성한 자유게시판 게시글 조회
router.get("/user/:userId", getUserFreeBoardPostsController as RequestHandler);

export default router;