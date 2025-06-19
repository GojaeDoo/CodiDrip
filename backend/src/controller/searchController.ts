import { Request, Response } from "express";
import { pool } from "../db";
import { RequestHandler } from "express";
import {
    getSearchResultService
} from "../service/searchService";

export const getSearchResultController = async (req: Request, res: Response) => {
    try {
        const keyword = req.query.keyword as string;
        const result = await getSearchResultService(keyword);
        res.status(200).json(result);
    } catch (error) {
        console.error("getSearchResultController error - searchController:", error);
        res.status(500).json({ error: "getSearchResultController 500error - searchController" });
    }
}