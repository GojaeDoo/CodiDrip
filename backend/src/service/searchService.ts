import { getSearchResultDB } from "../storage/searchStorage";

export const getSearchResultService = async (keyword: string) => {
    try {
        const result = await getSearchResultDB(keyword);
        return result;
    } catch (error) {
        console.error("getSearchResultService error - searchService:", error);
        throw new Error("getSearchResultService 500error - searchService");
    }
}