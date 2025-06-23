import { Request, Response } from "express";
import {
    createFreeBoardService,
    getFreeBoardListService,
    getFreeBoardDetailService,
    updateFreeBoardService,
    deleteFreeBoardService
} from "../service/freeBoardService";

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

export const getFreeBoardList = async (req: Request, res: Response) => {
    try {
        const result = await getFreeBoardListService();
        res.status(200).json(result);
    } catch (error) {
        console.error("getFreeBoardList error - freeBoardController:", error);
        res.status(500).json({ error: "getFreeBoardList 500error - freeBoardController" });
    }
}

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