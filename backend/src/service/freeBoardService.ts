import { createFreeBoardDB, getFreeBoardListDB, getFreeBoardDetailDB, updateFreeBoardDB, deleteFreeBoardDB, postFreeBoardCommentDB, getFreeBoardCommentDB, updateFreeBoardCommentDB, deleteFreeBoardCommentDB, postFreeBoardReplyDB, getFreeBoardRepliesDB } from "../storage/freeBoardStorage";

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

export const postFreeBoardCommentService = async (newComment: string, userId: string, id: string) => {
    try {
        const result = await postFreeBoardCommentDB(newComment, userId, id);
        return result;
    } catch (error) {
        console.error("postFreeBoardCommentService error - freeBoardService:", error);
        throw new Error("postFreeBoardCommentService 500error - freeBoardService");
    }
}

export const postFreeBoardReplyService = async (newComment: string, userId: string, postId: string, parentId: string) => {
    try {
        const result = await postFreeBoardReplyDB(newComment, userId, postId, parentId);
        return result;
    } catch (error) {
        console.error("postFreeBoardReplyService error - freeBoardService:", error);
        throw new Error("postFreeBoardReplyService 500error - freeBoardService");
    }
}

export const getFreeBoardCommentService = async (postId: number) => {
    try {
        const result = await getFreeBoardCommentDB(postId);
        return result;
    } catch (error) {
        console.error("getFreeBoardCommentService error - freeBoardService:", error);
        throw new Error("getFreeBoardCommentService 500error - freeBoardService");
    }
}

export const updateFreeBoardCommentService = async (commentId: string, content: string, userId: string) => {
    try {
        const result = await updateFreeBoardCommentDB(commentId, content, userId);
        return result;
    } catch (error) {
        console.error("updateFreeBoardCommentService error - freeBoardService:", error);
        throw error;
    }
}

export const deleteFreeBoardCommentService = async (commentId: string, userId: string) => {
    try {
        const result = await deleteFreeBoardCommentDB(commentId, userId);
        return result;
    } catch (error) {
        console.error("deleteFreeBoardCommentService error - freeBoardService:", error);
        throw error;
    }
}

export const getFreeBoardRepliesService = async (commentId: string) => {
    try {
        const result = await getFreeBoardRepliesDB(commentId);
        return result;
    } catch (error) {
        console.error("getFreeBoardRepliesService error - freeBoardService:", error);
        throw new Error("getFreeBoardRepliesService 500error - freeBoardService");
    }
}