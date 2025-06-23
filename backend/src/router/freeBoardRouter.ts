import express, { RequestHandler } from "express";
import { createFreeBoard, getFreeBoardList, getFreeBoardDetail, updateFreeBoard, deleteFreeBoard } from "../controller/freeBoardController";

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

export default router;