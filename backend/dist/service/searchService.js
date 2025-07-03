"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFreeBoardSearchService = exports.getSearchResultService = void 0;
const searchStorage_1 = require("../storage/searchStorage");
const getSearchResultService = async (keyword) => {
    try {
        const result = await (0, searchStorage_1.getSearchResultDB)(keyword);
        return result;
    }
    catch (error) {
        console.error("getSearchResultService error - searchService:", error);
        throw new Error("getSearchResultService 500error - searchService");
    }
};
exports.getSearchResultService = getSearchResultService;
const getFreeBoardSearchService = async (keyword) => {
    try {
        const result = await (0, searchStorage_1.getFreeBoardSearchDB)(keyword);
        return result;
    }
    catch (error) {
        console.error("getFreeBoardSearchService error - searchService:", error);
        throw new Error("getFreeBoardSearchService 500error - searchService");
    }
};
exports.getFreeBoardSearchService = getFreeBoardSearchService;
