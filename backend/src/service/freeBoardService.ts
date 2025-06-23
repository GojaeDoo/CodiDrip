import { createFreeBoardDB, getFreeBoardListDB, getFreeBoardDetailDB, updateFreeBoardDB, deleteFreeBoardDB } from "../storage/freeBoardStorage";

export const createFreeBoardService = async (title: string, content: string, userId: string) => {
    try {
        const result = await createFreeBoardDB(title, content, userId);
        return result;
    } catch (error) {
        console.error("createFreeBoardService error - freeBoardService:", error);
        throw new Error("createFreeBoardService 500error - freeBoardService");
    }
}

export const getFreeBoardListService = async () => {
    try {
        const result = await getFreeBoardListDB();
        return result;
    } catch (error) {
        console.error("getFreeBoardListService error - freeBoardService:", error);
        throw new Error("getFreeBoardListService 500error - freeBoardService");
    }
}

export const getFreeBoardDetailService = async (postId: number) => {
    try {
        const result = await getFreeBoardDetailDB(postId);
        return result;
    } catch (error) {
        console.error("getFreeBoardDetailService error - freeBoardService:", error);
        throw new Error("getFreeBoardDetailService 500error - freeBoardService");
    }
}

export const updateFreeBoardService = async (postId: number, title: string, content: string, userId: string) => {
    try {
        const result = await updateFreeBoardDB(postId, title, content, userId);
        return result;
    } catch (error) {
        console.error("updateFreeBoardService error - freeBoardService:", error);
        throw new Error("updateFreeBoardService 500error - freeBoardService");
    }
}

export const deleteFreeBoardService = async (postId: number) => {
    try {
        const result = await deleteFreeBoardDB(postId);
        return result;
    } catch (error) {
        console.error("deleteFreeBoardService error - freeBoardService:", error);
        throw new Error("deleteFreeBoardService 500error - freeBoardService");
    }
}