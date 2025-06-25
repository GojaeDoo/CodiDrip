import { Request, Response } from "express";
import {
    createFreeBoardService,
    getFreeBoardListService,
    getFreeBoardDetailService,
    updateFreeBoardService,
    deleteFreeBoardService,
    postFreeBoardCommentService,
    getFreeBoardCommentService,
    updateFreeBoardCommentService,
    deleteFreeBoardCommentService,
    postFreeBoardReplyService,
    getFreeBoardRepliesService
} from "../service/freeBoardService";

// 자유게시판 게시글


// 자유게시판 게시글 작성
export const createFreeBoard = async (req: Request, res: Response) => {
    try {
        const { title, content, userId } = req.body;
        const result = await createFreeBoardService(title, content, userId);
        res.status(201).json(result);
    } catch (error) {
        console.error("createFreeBoard error - freeBoardController:", error);
        res.status(500).json({ error: "createFreeBoard 500error - freeBoardController" });
    }
}

// 자유게시판 게시글 조회
export const getFreeBoardList = async (req: Request, res: Response) => {
    try {
        const result = await getFreeBoardListService();
        res.status(200).json(result);
    } catch (error) {
        console.error("getFreeBoardList error - freeBoardController:", error);
        res.status(500).json({ error: "getFreeBoardList 500error - freeBoardController" });
    }
}

// 자유게시판 게시글 상세 조회 
export const getFreeBoardDetail = async (req: Request, res: Response) => {
    try {
        const postId = parseInt(req.params.id);
        const result = await getFreeBoardDetailService(postId);
        
        if (!result) {
            return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
        }
        
        res.status(200).json(result);
    } catch (error) {
        console.error("getFreeBoardDetail error - freeBoardController:", error);
        res.status(500).json({ error: "getFreeBoardDetail 500error - freeBoardController" });
    }
}

// 자유게시판 게시글 수정
export const updateFreeBoard = async (req: Request, res: Response) => {
    try {
        const postId = parseInt(req.params.id);
        const { title, content, userId } = req.body;
        const result = await updateFreeBoardService(postId, title, content, userId);
        res.status(200).json(result);
    } catch (error) {
        console.error("updateFreeBoard error - freeBoardController:", error);
        if (error instanceof Error && error.message.includes("권한")) {
            res.status(403).json({ error: error.message });
        } else if (error instanceof Error && error.message.includes("찾을 수 없습니다")) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: "updateFreeBoard 500error - freeBoardController" });
        }
    }
}

// 자유게시판 게시글 삭제
export const deleteFreeBoard = async (req: Request, res: Response) => {
    try {
        const postId = parseInt(req.params.id);
        const result = await deleteFreeBoardService(postId);
        res.status(200).json(result);
    } catch (error) {
        console.error("deleteFreeBoard error - freeBoardController:", error);
        res.status(500).json({ error: "deleteFreeBoard 500error - freeBoardController" });
    }
}


// 자유게시판 댓글 

// 자유게시판 게시글 작성
export const postFreeBoardComment = async (req: Request, res: Response) => {
    try {
        const { newComment, userId, id } = req.body;
        const result = await postFreeBoardCommentService(newComment, userId, id);
        res.status(200).json(result);
    } catch (error) {
        console.error("postFreeBoardComment error - freeBoardController:", error);
        res.status(500).json({ error: "postFreeBoardComment 500error - freeBoardController" });
    }
}

// 자유게시판 게시글 댓글 조회
export const getFreeBoardComment = async (req: Request, res: Response) => {
    try {
        const postId = parseInt(req.params.id);
        const result = await getFreeBoardCommentService(postId);
        res.status(200).json(result);
    } catch (error) {
        console.error("getFreeBoardComment error - freeBoardController:", error);
        res.status(500).json({ error: "getFreeBoardComment 500error - freeBoardController" });
    }
}

// 자유게시판 댓글 수정
export const updateFreeBoardComment = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.commentId;
        const { content, userId } = req.body;
        const result = await updateFreeBoardCommentService(commentId, content, userId);
        res.status(200).json(result);
    } catch (error) {
        console.error("updateFreeBoardComment error - freeBoardController:", error);
        if (error instanceof Error && error.message.includes("권한")) {
            res.status(403).json({ error: error.message });
        } else if (error instanceof Error && error.message.includes("찾을 수 없습니다")) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: "updateFreeBoardComment 500error - freeBoardController" });
        }
    }
}

// 자유게시판 댓글 삭제
export const deleteFreeBoardComment = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.commentId;
        const { userId } = req.body;
        const result = await deleteFreeBoardCommentService(commentId, userId);
        res.status(200).json({ message: "댓글이 삭제되었습니다." });
    } catch (error) {
        console.error("deleteFreeBoardComment error - freeBoardController:", error);
        if (error instanceof Error && error.message.includes("권한")) {
            res.status(403).json({ error: error.message });
        } else if (error instanceof Error && error.message.includes("찾을 수 없습니다")) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: "deleteFreeBoardComment 500error - freeBoardController" });
        }
    }
}

// 자유게시판 대댓글 작성
export const postFreeBoardReply = async (req: Request, res: Response) => {
    try {
        const { newComment, userId, postId, parentId } = req.body;
        const result = await postFreeBoardReplyService(newComment, userId, postId, parentId);
        res.status(200).json(result);
    } catch (error) {
        console.error("postFreeBoardReply error - freeBoardController:", error);
        res.status(500).json({ error: "postFreeBoardReply 500error - freeBoardController" });
    }
}

// 자유게시판 대댓글 조회
export const getFreeBoardReplies = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.commentId;
        const result = await getFreeBoardRepliesService(commentId);
        res.status(200).json(result);
    } catch (error) {
        console.error("getFreeBoardReplies error - freeBoardController:", error);
        res.status(500).json({ error: "getFreeBoardReplies 500error - freeBoardController" });
    }
}