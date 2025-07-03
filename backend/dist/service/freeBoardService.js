"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFreeBoardPostsService = exports.getFreeBoardRepliesService = exports.deleteFreeBoardCommentService = exports.updateFreeBoardCommentService = exports.getFreeBoardCommentService = exports.postFreeBoardReplyService = exports.postFreeBoardCommentService = exports.deleteFreeBoardService = exports.updateFreeBoardService = exports.getFreeBoardDetailService = exports.getFreeBoardListService = exports.createFreeBoardService = void 0;
const freeBoardStorage_1 = require("../storage/freeBoardStorage");
const createFreeBoardService = async (title, content, userId) => {
    try {
        const result = await (0, freeBoardStorage_1.createFreeBoardDB)(title, content, userId);
        return result;
    }
    catch (error) {
        console.error("createFreeBoardService error - freeBoardService:", error);
        throw new Error("createFreeBoardService 500error - freeBoardService");
    }
};
exports.createFreeBoardService = createFreeBoardService;
const getFreeBoardListService = async () => {
    try {
        const result = await (0, freeBoardStorage_1.getFreeBoardListDB)();
        return result;
    }
    catch (error) {
        console.error("getFreeBoardListService error - freeBoardService:", error);
        throw new Error("getFreeBoardListService 500error - freeBoardService");
    }
};
exports.getFreeBoardListService = getFreeBoardListService;
const getFreeBoardDetailService = async (postId) => {
    try {
        const result = await (0, freeBoardStorage_1.getFreeBoardDetailDB)(postId);
        return result;
    }
    catch (error) {
        console.error("getFreeBoardDetailService error - freeBoardService:", error);
        throw new Error("getFreeBoardDetailService 500error - freeBoardService");
    }
};
exports.getFreeBoardDetailService = getFreeBoardDetailService;
const updateFreeBoardService = async (postId, title, content, userId) => {
    try {
        const result = await (0, freeBoardStorage_1.updateFreeBoardDB)(postId, title, content, userId);
        return result;
    }
    catch (error) {
        console.error("updateFreeBoardService error - freeBoardService:", error);
        throw new Error("updateFreeBoardService 500error - freeBoardService");
    }
};
exports.updateFreeBoardService = updateFreeBoardService;
const deleteFreeBoardService = async (postId) => {
    try {
        const result = await (0, freeBoardStorage_1.deleteFreeBoardDB)(postId);
        return result;
    }
    catch (error) {
        console.error("deleteFreeBoardService error - freeBoardService:", error);
        throw new Error("deleteFreeBoardService 500error - freeBoardService");
    }
};
exports.deleteFreeBoardService = deleteFreeBoardService;
const postFreeBoardCommentService = async (newComment, userId, id) => {
    try {
        const result = await (0, freeBoardStorage_1.postFreeBoardCommentDB)(newComment, userId, id);
        return result;
    }
    catch (error) {
        console.error("postFreeBoardCommentService error - freeBoardService:", error);
        throw new Error("postFreeBoardCommentService 500error - freeBoardService");
    }
};
exports.postFreeBoardCommentService = postFreeBoardCommentService;
const postFreeBoardReplyService = async (newComment, userId, postId, parentId) => {
    try {
        const result = await (0, freeBoardStorage_1.postFreeBoardReplyDB)(newComment, userId, postId, parentId);
        return result;
    }
    catch (error) {
        console.error("postFreeBoardReplyService error - freeBoardService:", error);
        throw new Error("postFreeBoardReplyService 500error - freeBoardService");
    }
};
exports.postFreeBoardReplyService = postFreeBoardReplyService;
const getFreeBoardCommentService = async (postId) => {
    try {
        const result = await (0, freeBoardStorage_1.getFreeBoardCommentDB)(postId);
        return result;
    }
    catch (error) {
        console.error("getFreeBoardCommentService error - freeBoardService:", error);
        throw new Error("getFreeBoardCommentService 500error - freeBoardService");
    }
};
exports.getFreeBoardCommentService = getFreeBoardCommentService;
const updateFreeBoardCommentService = async (commentId, content, userId) => {
    try {
        const result = await (0, freeBoardStorage_1.updateFreeBoardCommentDB)(commentId, content, userId);
        return result;
    }
    catch (error) {
        console.error("updateFreeBoardCommentService error - freeBoardService:", error);
        throw error;
    }
};
exports.updateFreeBoardCommentService = updateFreeBoardCommentService;
const deleteFreeBoardCommentService = async (commentId, userId) => {
    try {
        const result = await (0, freeBoardStorage_1.deleteFreeBoardCommentDB)(commentId, userId);
        return result;
    }
    catch (error) {
        console.error("deleteFreeBoardCommentService error - freeBoardService:", error);
        throw error;
    }
};
exports.deleteFreeBoardCommentService = deleteFreeBoardCommentService;
const getFreeBoardRepliesService = async (commentId) => {
    try {
        const result = await (0, freeBoardStorage_1.getFreeBoardRepliesDB)(commentId);
        return result;
    }
    catch (error) {
        console.error("getFreeBoardRepliesService error - freeBoardService:", error);
        throw new Error("getFreeBoardRepliesService 500error - freeBoardService");
    }
};
exports.getFreeBoardRepliesService = getFreeBoardRepliesService;
const getUserFreeBoardPostsService = async (userId) => {
    try {
        const result = await (0, freeBoardStorage_1.getUserFreeBoardPostsDB)(userId);
        return result;
    }
    catch (error) {
        console.error("getUserFreeBoardPostsService error - freeBoardService:", error);
        throw new Error("getUserFreeBoardPostsService 500error - freeBoardService");
    }
};
exports.getUserFreeBoardPostsService = getUserFreeBoardPostsService;
