import { getSearchResultDB, getFreeBoardSearchDB } from "../storage/searchStorage";

export const getSearchResultService = async (keyword: string) => {
    try {
        const result = await getSearchResultDB(keyword);
        return result;
    } catch (error) {
        console.error("getSearchResultService error - searchService:", error);
        throw new Error("getSearchResultService 500error - searchService");
    }
}

export const getFreeBoardSearchService = async (keyword: string) => {
    try {
        const result = await getFreeBoardSearchDB(keyword);
        return result;
    } catch (error) {
        console.error("getFreeBoardSearchService error - searchService:", error);
        throw new Error("getFreeBoardSearchService 500error - searchService");
    }
}