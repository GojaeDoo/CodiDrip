import express, { RequestHandler } from "express";

import {
    getSearchResultController
} from "../controller/searchController";

const router = express.Router();

router.get("/search", getSearchResultController as RequestHandler);

export default router;