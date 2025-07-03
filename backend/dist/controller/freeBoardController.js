"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFreeBoardPostsController = exports.getFreeBoardRepliesController = exports.postFreeBoardReplyController = exports.deleteFreeBoardCommentController = exports.updateFreeBoardCommentController = exports.getFreeBoardCommentController = exports.postFreeBoardCommentController = exports.deleteFreeBoardController = exports.postUpdateFreeBoardController = exports.getFreeBoardDetailController = exports.getFreeBoardListController = exports.postCreateFreeBoardController = void 0;
const freeBoardService_1 = require("../service/freeBoardService");
// 자유게시판 게시글
// 자유게시판 게시글 작성
const postCreateFreeBoardController = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const result = await (0, freeBoardService_1.createFreeBoardService)(title, content, userId);
        res.status(201).json(result);
    }
    catch (error) {
        console.error("createFreeBoard error - freeBoardController:", error);
        res.status(500).json({ error: "createFreeBoard 500error - freeBoardController" });
    }
};
exports.postCreateFreeBoardController = postCreateFreeBoardController;
// 자유게시판 게시글 조회
const getFreeBoardListController = async (req, res) => {
    try {
        const result = await (0, freeBoardService_1.getFreeBoardListService)();
        res.status(200).json(result);
    }
    catch (error) {
        console.error("getFreeBoardList error - freeBoardController:", error);
        res.status(500).json({ error: "getFreeBoardList 500error - freeBoardController" });
    }
};
exports.getFreeBoardListController = getFreeBoardListController;
// 자유게시판 게시글 상세 조회 
const getFreeBoardDetailController = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const result = await (0, freeBoardService_1.getFreeBoardDetailService)(postId);
        if (!result) {
            return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
        }
        res.status(200).json(result);
    }
    catch (error) {
        console.error("getFreeBoardDetail error - freeBoardController:", error);
        res.status(500).json({ error: "getFreeBoardDetail 500error - freeBoardController" });
    }
};
exports.getFreeBoardDetailController = getFreeBoardDetailController;
// 자유게시판 게시글 수정
const postUpdateFreeBoardController = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const { title, content, userId } = req.body;
        const result = await (0, freeBoardService_1.updateFreeBoardService)(postId, title, content, userId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("updateFreeBoard error - freeBoardController:", error);
        if (error instanceof Error && error.message.includes("권한")) {
            res.status(403).json({ error: error.message });
        }
        else if (error instanceof Error && error.message.includes("찾을 수 없습니다")) {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "updateFreeBoard 500error - freeBoardController" });
        }
    }
};
exports.postUpdateFreeBoardController = postUpdateFreeBoardController;
// 자유게시판 게시글 삭제
const deleteFreeBoardController = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const result = await (0, freeBoardService_1.deleteFreeBoardService)(postId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("deleteFreeBoard error - freeBoardController:", error);
        res.status(500).json({ error: "deleteFreeBoard 500error - freeBoardController" });
    }
};
exports.deleteFreeBoardController = deleteFreeBoardController;
// 자유게시판 댓글 
// 자유게시판 게시글 작성
const postFreeBoardCommentController = async (req, res) => {
    try {
        const { newComment, userId, id } = req.body;
        const result = await (0, freeBoardService_1.postFreeBoardCommentService)(newComment, userId, id);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("postFreeBoardComment error - freeBoardController:", error);
        res.status(500).json({ error: "postFreeBoardComment 500error - freeBoardController" });
    }
};
exports.postFreeBoardCommentController = postFreeBoardCommentController;
// 자유게시판 게시글 댓글 조회
const getFreeBoardCommentController = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const result = await (0, freeBoardService_1.getFreeBoardCommentService)(postId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("getFreeBoardComment error - freeBoardController:", error);
        res.status(500).json({ error: "getFreeBoardComment 500error - freeBoardController" });
    }
};
exports.getFreeBoardCommentController = getFreeBoardCommentController;
// 자유게시판 댓글 수정
const updateFreeBoardCommentController = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { content, userId } = req.body;
        const result = await (0, freeBoardService_1.updateFreeBoardCommentService)(commentId, content, userId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("updateFreeBoardComment error - freeBoardController:", error);
        if (error instanceof Error && error.message.includes("권한")) {
            res.status(403).json({ error: error.message });
        }
        else if (error instanceof Error && error.message.includes("찾을 수 없습니다")) {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "updateFreeBoardComment 500error - freeBoardController" });
        }
    }
};
exports.updateFreeBoardCommentController = updateFreeBoardCommentController;
// 자유게시판 댓글 삭제
const deleteFreeBoardCommentController = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { userId } = req.body;
        const result = await (0, freeBoardService_1.deleteFreeBoardCommentService)(commentId, userId);
        res.status(200).json({ message: "댓글이 삭제되었습니다." });
    }
    catch (error) {
        console.error("deleteFreeBoardComment error - freeBoardController:", error);
        if (error instanceof Error && error.message.includes("권한")) {
            res.status(403).json({ error: error.message });
        }
        else if (error instanceof Error && error.message.includes("찾을 수 없습니다")) {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "deleteFreeBoardComment 500error - freeBoardController" });
        }
    }
};
exports.deleteFreeBoardCommentController = deleteFreeBoardCommentController;
// 자유게시판 대댓글 작성
const postFreeBoardReplyController = async (req, res) => {
    try {
        const { newComment, userId, postId, parentId } = req.body;
        const result = await (0, freeBoardService_1.postFreeBoardReplyService)(newComment, userId, postId, parentId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("postFreeBoardReply error - freeBoardController:", error);
        res.status(500).json({ error: "postFreeBoardReply 500error - freeBoardController" });
    }
};
exports.postFreeBoardReplyController = postFreeBoardReplyController;
// 자유게시판 대댓글 조회
const getFreeBoardRepliesController = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const result = await (0, freeBoardService_1.getFreeBoardRepliesService)(commentId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("getFreeBoardReplies error - freeBoardController:", error);
        res.status(500).json({ error: "getFreeBoardReplies 500error - freeBoardController" });
    }
};
exports.getFreeBoardRepliesController = getFreeBoardRepliesController;
// 사용자가 작성한 자유게시판 게시글 조회
const getUserFreeBoardPostsController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await (0, freeBoardService_1.getUserFreeBoardPostsService)(userId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("getUserFreeBoardPosts error - freeBoardController:", error);
        res.status(500).json({ error: "getUserFreeBoardPosts 500error - freeBoardController" });
    }
};
exports.getUserFreeBoardPostsController = getUserFreeBoardPostsController;
