"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const freeBoardController_1 = require("../controller/freeBoardController");
const router = express_1.default.Router();
// 게시글 목록 조회
router.get("/", freeBoardController_1.getFreeBoardListController);
// 게시글 상세 조회
router.get("/:id", freeBoardController_1.getFreeBoardDetailController);
// 게시글 작성
router.post("/", freeBoardController_1.postCreateFreeBoardController);
// 게시글 수정
router.put("/:id", freeBoardController_1.postUpdateFreeBoardController);
// 게시글 삭제
router.delete("/:id", freeBoardController_1.deleteFreeBoardController);
// 자유게시판 게시글 댓글 작성
router.post("/comment", freeBoardController_1.postFreeBoardCommentController);
// 자유게시판 대댓글 작성
router.post("/comment/reply", freeBoardController_1.postFreeBoardReplyController);
// 자유게시판 대댓글 조회 (더 구체적인 경로를 먼저 정의)
router.get("/comment/:commentId/replies", freeBoardController_1.getFreeBoardRepliesController);
// 자유게시판 게시글 댓글 조회
router.get("/comment/:id", freeBoardController_1.getFreeBoardCommentController);
// 자유게시판 댓글 수정
router.put("/comment/:commentId", freeBoardController_1.updateFreeBoardCommentController);
// 자유게시판 댓글 삭제
router.delete("/comment/:commentId", freeBoardController_1.deleteFreeBoardCommentController);
// 자유게시판 대댓글 조회
// router.get("/replies/:commentId", getFreeBoardReplies as RequestHandler);
// 사용자가 작성한 자유게시판 게시글 조회
router.get("/user/:userId", freeBoardController_1.getUserFreeBoardPostsController);
exports.default = router;
