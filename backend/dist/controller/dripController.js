"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDripImageController = exports.getDripPostSaveStatusController = exports.saveDripPostController = exports.getDripPostLikeStatusController = exports.unlikeDripPostController = exports.likeDripPostController = exports.postDripPostReplyController = exports.unlikeDripPostCommentController = exports.likeDripPostCommentController = exports.deleteDripPostCommentController = exports.updateDripPostCommentController = exports.getDripPostRepliesController = exports.postDripPostCommentController = exports.getDripPostCommentController = exports.deleteDripController = exports.postUpdateDripController = exports.getPostNoDripController = exports.getUserDripController = exports.postCreateDripController = void 0;
const dripService_1 = require("../service/dripService");
const db_1 = require("../db");
const storageService_1 = require("../service/storageService");
const postCreateDripController = async (req, res) => {
    try {
        const { images, tags, styleCategory, userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }
        if (!styleCategory) {
            return res.status(400).json({ error: "styleCategory is required" });
        }
        const result = await dripService_1.dripService.postCreateDripService(images, tags, styleCategory, userId);
        res.status(201).json(result);
    }
    catch (error) {
        console.error("createDrip error - dripController:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.postCreateDripController = postCreateDripController;
const getUserDripController = async (req, res) => {
    try {
        const userId = req.query.userId;
        const filterUserId = req.query.filterUserId;
        const gender = req.query.gender;
        const isLike = req.query.isLike === 'true';
        const isSaved = req.query.isSaved === 'true';
        const styles = req.query.styles;
        const drips = await dripService_1.dripService.getUserDripService(userId, filterUserId, gender, isLike, isSaved, styles);
        res.status(200).json(drips);
    }
    catch (error) {
        console.error("getUserDrip error - dripController:", error);
        res.status(500).json({ error: "getUserDrip 500error - dripController" });
    }
};
exports.getUserDripController = getUserDripController;
const getPostNoDripController = async (req, res) => {
    try {
        const postNo = parseInt(req.params.postNo, 10);
        const userId = req.query.userId;
        if (isNaN(postNo)) {
            return res
                .status(400)
                .json({ error: "유효하지 않은 게시물 번호입니다." });
        }
        const drip = await dripService_1.dripService.getPostNoDripService(postNo, userId);
        res.status(200).json(drip);
    }
    catch (error) {
        console.error("getPostNoDrip error - dripController:", error);
        res.status(500).json({ error: "getPostNoDrip 500error - dripController" });
    }
};
exports.getPostNoDripController = getPostNoDripController;
const postUpdateDripController = async (req, res) => {
    try {
        const postNo = req.params.postNo;
        const { images, tags, styleCategory, userId } = req.body;
        if (!postNo || !images || !tags || !styleCategory || !userId) {
            return res.status(400).json({ error: "필수 정보가 누락되었습니다." });
        }
        const updatedDrip = await dripService_1.dripService.postUpdateDripService(postNo, images, tags, styleCategory, userId);
        res.status(200).json(updatedDrip);
    }
    catch (error) {
        console.error("updateDrip error - dripController:", error);
        res.status(500).json({ error: "게시물 수정 중 오류가 발생했습니다." });
    }
};
exports.postUpdateDripController = postUpdateDripController;
const deleteDripController = async (req, res) => {
    try {
        const postNo = req.params.postNo;
        const result = await dripService_1.dripService.deleteDripService(postNo);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("deleteDrip error - dripController:", error);
        res.status(500).json({ error: "게시물 삭제 중 오류가 발생했습니다." });
    }
};
exports.deleteDripController = deleteDripController;
const getDripPostCommentController = async (req, res) => {
    const { postNo } = req.params;
    const userId = req.query.userId || req.body.userId;
    try {
        const result = await dripService_1.dripService.getDripPostCommentService(Number(postNo), userId);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: '댓글 조회 중 오류가 발생했습니다.' });
    }
};
exports.getDripPostCommentController = getDripPostCommentController;
const postDripPostCommentController = async (req, res) => {
    const { postNo } = req.params;
    const { user_id, content, parent_id } = req.body;
    try {
        const result = await db_1.pool.query('INSERT INTO drip_post_comment (post_id, user_id, content, parent_id) VALUES ($1, $2, $3, $4) RETURNING *', [postNo, user_id, content, parent_id || null]);
        // 사용자 정보 조회
        const userResult = await db_1.pool.query('SELECT profile_nickname, profile_image FROM profile WHERE user_id = $1', [user_id]);
        const comment = {
            ...result.rows[0],
            user: userResult.rows[0]
        };
        res.json(comment);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: '댓글 작성 중 오류가 발생했습니다.' });
    }
};
exports.postDripPostCommentController = postDripPostCommentController;
const getDripPostRepliesController = async (req, res) => {
    const { commentId } = req.params;
    try {
        const replies = await dripService_1.dripService.getDripPostReplies(Number(commentId));
        res.json(replies);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: '답글 조회 중 오류가 발생했습니다.' });
    }
};
exports.getDripPostRepliesController = getDripPostRepliesController;
const updateDripPostCommentController = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    try {
        await dripService_1.dripService.updateDripPostCommentService(Number(commentId), content);
        res.json({ message: '댓글이 수정되었습니다.' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: '댓글 수정 중 오류가 발생했습니다.' });
    }
};
exports.updateDripPostCommentController = updateDripPostCommentController;
const deleteDripPostCommentController = async (req, res) => {
    const { commentId } = req.params;
    try {
        await db_1.pool.query('DELETE FROM drip_post_comment WHERE id = $1', [commentId]);
        res.json({ message: '댓글이 삭제되었습니다.' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: '댓글 삭제 중 오류가 발생했습니다.' });
    }
};
exports.deleteDripPostCommentController = deleteDripPostCommentController;
const likeDripPostCommentController = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.query.userId || req.body.userId;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
    try {
        const result = await dripService_1.dripService.likeDripPostCommentService(userId, Number(commentId));
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: '댓글 좋아요 중 오류가 발생했습니다.' });
    }
};
exports.likeDripPostCommentController = likeDripPostCommentController;
const unlikeDripPostCommentController = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.query.userId || req.body.userId;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
    try {
        const result = await dripService_1.dripService.unlikeDripPostCommentService(userId, Number(commentId));
        res.json(result);
    }
    catch (err) {
        console.error('Unlike Comment Error:', err);
        res.status(500).json({ error: '댓글 좋아요 취소 중 오류가 발생했습니다.' });
    }
};
exports.unlikeDripPostCommentController = unlikeDripPostCommentController;
const postDripPostReplyController = async (req, res) => {
    const { postNo, user_id, content, parent_id } = req.body;
    try {
        const result = await db_1.pool.query('INSERT INTO drip_post_comment (post_id, user_id, content, parent_id) VALUES ($1, $2, $3, $4) RETURNING *', [postNo, user_id, content, parent_id || null]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: '댓글 작성 중 오류가 발생했습니다.' });
    }
};
exports.postDripPostReplyController = postDripPostReplyController;
const likeDripPostController = async (req, res) => {
    try {
        const postNo = parseInt(req.params.postNo, 10);
        const userId = req.query.userId || req.body.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const result = await dripService_1.dripService.likeDripPostService(userId, postNo);
        res.json({
            success: true,
            liked: result.liked,
            likeCount: result.likeCount
        });
    }
    catch (error) {
        console.error("likeDripPostController error:", error);
        res.status(500).json({ error: "Failed to like post" });
    }
};
exports.likeDripPostController = likeDripPostController;
const unlikeDripPostController = async (req, res) => {
    try {
        const postNo = parseInt(req.params.postNo, 10);
        const userId = req.query.userId || req.body.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const result = await dripService_1.dripService.unlikeDripPostService(userId, postNo);
        res.json({
            success: true,
            liked: false,
            likeCount: result.likeCount
        });
    }
    catch (error) {
        console.error("unlikeDripPostController error:", error);
        res.status(500).json({ error: "Failed to unlike post" });
    }
};
exports.unlikeDripPostController = unlikeDripPostController;
const getDripPostLikeStatusController = async (req, res) => {
    try {
        const userId = req.query.user_id;
        const postNo = parseInt(req.query.post_no, 10);
        if (!userId || isNaN(postNo)) {
            return res.status(400).json({ error: "user_id와 post_no가 필요합니다." });
        }
        const isLiked = await dripService_1.dripService.getDripPostLikeStatusService(userId, postNo);
        res.json({ is_liked: isLiked });
    }
    catch (error) {
        console.error("getDripPostLikeStatusController error:", error);
        res.status(500).json({ error: "좋아요 상태 조회 중 오류가 발생했습니다." });
    }
};
exports.getDripPostLikeStatusController = getDripPostLikeStatusController;
const saveDripPostController = async (req, res) => {
    try {
        const postNo = parseInt(req.params.postNo, 10);
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        if (isNaN(postNo)) {
            return res.status(400).json({ error: "Invalid post number" });
        }
        const result = await dripService_1.dripService.saveDripPostService(postNo, userId);
        res.json(result);
    }
    catch (error) {
        console.error("saveDripPostController error:", error);
        res.status(500).json({ error: "Failed to save post" });
    }
};
exports.saveDripPostController = saveDripPostController;
const getDripPostSaveStatusController = async (req, res) => {
    try {
        const postNo = parseInt(req.params.postNo, 10);
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        if (isNaN(postNo)) {
            return res.status(400).json({ error: "Invalid post number" });
        }
        const saved = await dripService_1.dripService.getDripPostSaveStatusService(postNo, userId);
        res.json({ saved });
    }
    catch (error) {
        console.error("getDripPostSaveStatusController error:", error);
        res.status(500).json({ error: "Failed to get save status" });
    }
};
exports.getDripPostSaveStatusController = getDripPostSaveStatusController;
// Drip 이미지 업로드 컨트롤러
const uploadDripImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "이미지 파일이 필요합니다." });
        }
        const fileName = `dripImage-${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;
        const result = await storageService_1.StorageService.uploadDripImage(req.file.buffer, fileName);
        if (result.success && result.url) {
            res.json({
                success: true,
                imageUrl: result.url,
                fileName: fileName
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: result.error || "이미지 업로드에 실패했습니다."
            });
        }
    }
    catch (error) {
        console.error("Drip 이미지 업로드 중 오류 발생:", error);
        res.status(500).json({ error: "이미지 업로드 중 오류가 발생했습니다." });
    }
};
exports.uploadDripImageController = uploadDripImageController;
