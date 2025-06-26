import express, { RequestHandler } from "express";
import { createFreeBoard, getFreeBoardList, getFreeBoardDetail, updateFreeBoard, deleteFreeBoard, postFreeBoardComment, getFreeBoardComment, updateFreeBoardComment, deleteFreeBoardComment, postFreeBoardReply, getFreeBoardReplies, getUserFreeBoardPosts } from "../controller/freeBoardController";

const router = express.Router();

// 게시글 목록 조회
router.get("/", getFreeBoardList as RequestHandler);

// 게시글 상세 조회
router.get("/:id", getFreeBoardDetail as RequestHandler);

// 게시글 작성
router.post("/", createFreeBoard as RequestHandler);

// 게시글 수정
router.put("/:id", updateFreeBoard as RequestHandler);

// 게시글 삭제
router.delete("/:id", deleteFreeBoard as RequestHandler);


// 자유게시판 게시글 댓글 작성
router.post("/comment", postFreeBoardComment as RequestHandler);

// 자유게시판 대댓글 작성
router.post("/comment/reply", postFreeBoardReply as RequestHandler);

// 자유게시판 대댓글 조회 (더 구체적인 경로를 먼저 정의)
router.get("/comment/:commentId/replies", getFreeBoardReplies as RequestHandler);

// 자유게시판 게시글 댓글 조회
router.get("/comment/:id", getFreeBoardComment as RequestHandler);

// 자유게시판 댓글 수정
router.put("/comment/:commentId", updateFreeBoardComment as RequestHandler);

// 자유게시판 댓글 삭제
router.delete("/comment/:commentId", deleteFreeBoardComment as RequestHandler);

// 자유게시판 대댓글 조회
router.get("/replies/:commentId", getFreeBoardReplies as RequestHandler);

// 사용자가 작성한 자유게시판 게시글 조회
router.get("/user/:userId", getUserFreeBoardPosts as RequestHandler);

export default router;