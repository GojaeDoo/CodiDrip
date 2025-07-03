"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFreeBoardSearchController = exports.getSearchResultController = void 0;
const searchService_1 = require("../service/searchService");
const getSearchResultController = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const result = await (0, searchService_1.getSearchResultService)(keyword);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("getSearchResultController error - searchController:", error);
        res.status(500).json({ error: "getSearchResultController 500error - searchController" });
    }
};
exports.getSearchResultController = getSearchResultController;
const getFreeBoardSearchController = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const result = await (0, searchService_1.getFreeBoardSearchService)(keyword);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("getFreeBoardSearchController error - searchController:", error);
        res.status(500).json({ error: "getFreeBoardSearchController 500error - searchController" });
    }
};
exports.getFreeBoardSearchController = getFreeBoardSearchController;
