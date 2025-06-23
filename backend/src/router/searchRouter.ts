import express, { RequestHandler } from "express";

import {
    getSearchResultController,
    getFreeBoardSearchController
} from "../controller/searchController";

const router = express.Router();

router.get("/search", getSearchResultController as RequestHandler);
router.get("/freeBoard", getFreeBoardSearchController as RequestHandler);

export default router;