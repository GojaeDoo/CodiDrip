"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDripPostReplyService = exports.postDripPostCommentService = exports.getUserDripPostService = exports.dripService = void 0;
const dripStorage_1 = require("../storage/dripStorage");
exports.dripService = {
    postCreateDripService: async (images, tags, styleCategory, userId) => {
        try {
            const processedImages = await Promise.all(images.map(async (image) => {
                if (image.startsWith("data:image")) {
                    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                    if (!matches || matches.length !== 3) {
                        throw new Error("Invalid image format");
                    }
                    const contentType = matches[1];
                    const base64Data = matches[2];
                    const buffer = Buffer.from(base64Data, "base64");
                    return await (0, dripStorage_1.uploadDripImage)(buffer, contentType);
                }
                return image;
            }));
            const result = await (0, dripStorage_1.postCreateDripStorage)(processedImages, tags, styleCategory, userId);
            return result;
        }
        catch (error) {
            console.error("createDrip error - dripService:", error);
            throw error;
        }
    },
    getUserDripService: async (userId, filterUserId, gender, isLike, isSaved, styles) => {
        try {
            const drips = await (0, dripStorage_1.getUserDripPostStorage)(userId, filterUserId, gender, isLike, isSaved, styles);
            return drips;
        }
        catch (error) {
            console.error("getUserDrip error - dripService:", error);
            throw error;
        }
    },
    getPostNoDripService: async (postNo, userId) => {
        try {
            const drip = await (0, dripStorage_1.getPostNoDripPostStorage)(postNo, userId);
            return drip;
        }
        catch (error) {
            console.error("getPostNoDrip error - dripService:", error);
            throw error;
        }
    },
    postUpdateDripService: async (postNo, images, tags, styleCategory, userId) => {
        try {
            // base64 이미지인 경우에만 업로드 처리
            const uploadedImages = await Promise.all(images.map(async (image) => {
                if (image.startsWith("data:")) {
                    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                    if (!matches || matches.length !== 3) {
                        throw new Error("Invalid image format");
                    }
                    const contentType = matches[1];
                    const base64Data = matches[2];
                    const buffer = Buffer.from(base64Data, "base64");
                    return await (0, dripStorage_1.uploadDripImage)(buffer, contentType);
                }
                return image; // 이미 서버에 있는 이미지는 그대로 사용
            }));
            return await (0, dripStorage_1.postUpdateDripPostStorage)(postNo, uploadedImages, tags, styleCategory, userId);
        }
        catch (error) {
            console.error("updateDrip error - dripService:", error);
            throw error;
        }
    },
    deleteDripService: async (postNo) => {
        try {
            const result = await (0, dripStorage_1.deleteDripPostStorage)(Number(postNo));
            return result;
        }
        catch (error) {
            console.error("deleteDrip error - dripService:", error);
            throw error;
        }
    },
    getDripPostCommentService: async (postNo, userId) => {
        try {
            const drip = await (0, dripStorage_1.getDripPostCommentStorage)(postNo, userId);
            return drip;
        }
        catch (error) {
            console.log(error + "getDripPostCommentService error");
        }
    },
    postDripPostCommentService: async (userId, postComment, postNo, parentId = null) => {
        try {
            return await (0, dripStorage_1.postDripPostCommentStorage)(userId, postComment, postNo, parentId);
        }
        catch (error) {
            console.error("Error in postDripPostCommentService:", error);
            throw error;
        }
    },
    getDripPostReplies: async (commentId) => {
        return await (0, dripStorage_1.getDripPostRepliesStorage)(commentId);
    },
    updateDripPostCommentService: async (commentId, content) => {
        return await (0, dripStorage_1.updateDripPostCommentStorage)(commentId, content);
    },
    likeDripPostCommentService: async (userId, commentId) => {
        return await (0, dripStorage_1.likeDripPostCommentStorage)(userId, commentId);
    },
    unlikeDripPostCommentService: async (userId, commentId) => {
        return await (0, dripStorage_1.unlikeDripPostCommentStorage)(userId, commentId);
    },
    likeDripPostService: async (userId, postNo) => {
        try {
            const result = await (0, dripStorage_1.likeDripPostStorage)(userId, postNo);
            return result;
        }
        catch (error) {
            console.error('likeDripPostService error:', error);
            throw error;
        }
    },
    unlikeDripPostService: async (userId, postNo) => {
        try {
            const result = await (0, dripStorage_1.unlikeDripPostStorage)(userId, postNo);
            return result;
        }
        catch (error) {
            console.error('unlikeDripPostService error:', error);
            throw error;
        }
    },
    getDripPostLikeStatusService: async (userId, postNo) => {
        return await (0, dripStorage_1.getDripPostLikeStatusStorage)(userId, postNo);
    },
    saveDripPostService: async (postNo, userId) => {
        try {
            return await (0, dripStorage_1.saveDripPostStorage)(postNo, userId);
        }
        catch (error) {
            console.error("Error in saveDripPostService:", error);
            throw error;
        }
    },
    getDripPostSaveStatusService: async (postNo, userId) => {
        try {
            return await (0, dripStorage_1.getDripPostSaveStatusStorage)(postNo, userId);
        }
        catch (error) {
            console.error("Error in getDripPostSaveStatusService:", error);
            throw error;
        }
    }
};
const getUserDripPostService = async (userId) => {
    try {
        return await (0, dripStorage_1.getUserDripPostStorage)(userId);
    }
    catch (error) {
        console.error("Error in getUserDripPostService:", error);
        throw error;
    }
};
exports.getUserDripPostService = getUserDripPostService;
const postDripPostCommentService = async (userId, postComment, postNo) => {
    try {
        return await (0, dripStorage_1.postDripPostCommentStorage)(userId, postComment, postNo);
    }
    catch (error) {
        console.error("Error in postDripPostCommentService:", error);
        throw error;
    }
};
exports.postDripPostCommentService = postDripPostCommentService;
const postDripPostReplyService = async (userId, postReply, postNo, parentId) => {
    try {
        return await (0, dripStorage_1.postDripPostReplyStorage)(userId, postReply, postNo, parentId);
    }
    catch (error) {
        console.error("Error in postDripPostReplyService:", error);
        throw error;
    }
};
exports.postDripPostReplyService = postDripPostReplyService;
