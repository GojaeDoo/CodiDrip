"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFreeBoardPostsDB = exports.deleteFreeBoardCommentDB = exports.updateFreeBoardCommentDB = exports.getFreeBoardRepliesCountDB = exports.getFreeBoardRepliesDB = exports.getFreeBoardCommentDB = exports.postFreeBoardReplyDB = exports.postFreeBoardCommentDB = exports.deleteFreeBoardDB = exports.updateFreeBoardDB = exports.getFreeBoardDetailDB = exports.getFreeBoardListDB = exports.createFreeBoardDB = void 0;
const db_1 = require("../db");
const createFreeBoardDB = async (title, content, userId) => {
    try {
        // profile 테이블에서 nickname 가져오기
        const profileResult = await db_1.pool.query("SELECT profile_nickname FROM profile WHERE user_id = $1", [userId]);
        const profileNickname = profileResult.rows[0]?.profile_nickname || "익명";
        // 게시글 삽입
        const insertResult = await db_1.pool.query("INSERT INTO freeBoard (title, content, user_id, profile_nickname) VALUES ($1, $2, $3, $4) RETURNING *", [title, content, userId, profileNickname]);
        return insertResult.rows[0];
    }
    catch (error) {
        console.error("createFreeBoardDB error - freeBoardStorage:", error);
        throw new Error("createFreeBoardDB 500error - freeBoardStorage");
    }
};
exports.createFreeBoardDB = createFreeBoardDB;
const getFreeBoardListDB = async () => {
    try {
        const result = await db_1.pool.query("SELECT id, title, profile_nickname as author, created_at as \"createdAt\", view_count as \"viewCount\" FROM freeBoard ORDER BY created_at DESC");
        return result.rows;
    }
    catch (error) {
        console.error("getFreeBoardListDB error - freeBoardStorage:", error);
        throw new Error("getFreeBoardListDB 500error - freeBoardStorage");
    }
};
exports.getFreeBoardListDB = getFreeBoardListDB;
const getFreeBoardDetailDB = async (postId) => {
    try {
        // 조회수 증가
        await db_1.pool.query("UPDATE freeBoard SET view_count = view_count + 1 WHERE id = $1", [postId]);
        // 게시글 상세 정보 조회
        const result = await db_1.pool.query("SELECT id, title, user_id, content, profile_nickname as author, created_at as \"createdAt\", view_count as \"viewCount\" FROM freeBoard WHERE id = $1", [postId]);
        return result.rows[0];
    }
    catch (error) {
        console.error("getFreeBoardDetailDB error - freeBoardStorage:", error);
        throw new Error("getFreeBoardDetailDB 500error - freeBoardStorage");
    }
};
exports.getFreeBoardDetailDB = getFreeBoardDetailDB;
const updateFreeBoardDB = async (postId, title, content, userId) => {
    try {
        // 작성자 확인
        const authorCheck = await db_1.pool.query("SELECT user_id FROM freeBoard WHERE id = $1", [postId]);
        if (authorCheck.rows.length === 0) {
            throw new Error("게시글을 찾을 수 없습니다.");
        }
        if (authorCheck.rows[0].user_id !== userId) {
            throw new Error("수정 권한이 없습니다.");
        }
        // 게시글 수정 (updated_at 컬럼 제거)
        const result = await db_1.pool.query("UPDATE freeBoard SET title = $1, content = $2 WHERE id = $3 RETURNING *", [title, content, postId]);
        return result.rows[0];
    }
    catch (error) {
        console.error("updateFreeBoardDB error - freeBoardStorage:", error);
        throw error; // 원본 에러를 그대로 전달
    }
};
exports.updateFreeBoardDB = updateFreeBoardDB;
const deleteFreeBoardDB = async (postId) => {
    try {
        const result = await db_1.pool.query("DELETE FROM freeBoard WHERE id = $1", [postId]);
        return result.rowCount;
    }
    catch (error) {
        console.error("deleteFreeBoardDB error - freeBoardStorage:", error);
        throw new Error("deleteFreeBoardDB 500error - freeBoardStorage");
    }
};
exports.deleteFreeBoardDB = deleteFreeBoardDB;
const postFreeBoardCommentDB = async (newComment, userId, id) => {
    try {
        const result = await db_1.pool.query("INSERT INTO freeboard_comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *", [newComment, userId, id]);
        return result.rows[0];
    }
    catch (error) {
        console.error("postFreeBoardCommentDB error - freeBoardStorage:", error);
        throw new Error("postFreeBoardCommentDB 500error - freeBoardStorage");
    }
};
exports.postFreeBoardCommentDB = postFreeBoardCommentDB;
const postFreeBoardReplyDB = async (newComment, userId, postId, parentId) => {
    try {
        const result = await db_1.pool.query("INSERT INTO freeboard_comments (content, user_id, post_id, parent_id) VALUES ($1, $2, $3, $4) RETURNING *", [newComment, userId, postId, parentId]);
        return result.rows[0];
    }
    catch (error) {
        console.error("postFreeBoardReplyDB error - freeBoardStorage:", error);
        throw new Error("postFreeBoardReplyDB 500error - freeBoardStorage");
    }
};
exports.postFreeBoardReplyDB = postFreeBoardReplyDB;
const getFreeBoardCommentDB = async (postId) => {
    try {
        const result = await db_1.pool.query("SELECT fc.id,fc.post_id ,fc.created_at ,p.profile_nickname ,p.user_id ,p.profile_image ,fc.content,fc.parent_id FROM freeboard_comments fc join profile p on fc.user_id = p.user_id WHERE post_id = $1 AND fc.parent_id IS NULL ORDER BY fc.created_at ASC", [postId]);
        // 각 댓글의 대댓글 개수 조회
        const commentsWithReplyCount = await Promise.all(result.rows.map(async (comment) => {
            const replyCount = await (0, exports.getFreeBoardRepliesCountDB)(comment.id);
            return {
                ...comment,
                reply_count: replyCount
            };
        }));
        return commentsWithReplyCount;
    }
    catch (error) {
        console.error("getFreeBoardCommentDB error - freeBoardStorage:", error);
        throw new Error("getFreeBoardCommentDB 500error - freeBoardStorage");
    }
};
exports.getFreeBoardCommentDB = getFreeBoardCommentDB;
const getFreeBoardRepliesDB = async (commentId) => {
    try {
        const result = await db_1.pool.query("SELECT fc.id,fc.post_id ,fc.created_at ,p.profile_nickname ,p.user_id ,p.profile_image ,fc.content,fc.parent_id FROM freeboard_comments fc join profile p on fc.user_id = p.user_id WHERE fc.parent_id = $1 ORDER BY fc.created_at ASC", [commentId]);
        return result.rows;
    }
    catch (error) {
        console.error("getFreeBoardRepliesDB error - freeBoardStorage:", error);
        throw new Error("getFreeBoardRepliesDB 500error - freeBoardStorage");
    }
};
exports.getFreeBoardRepliesDB = getFreeBoardRepliesDB;
const getFreeBoardRepliesCountDB = async (commentId) => {
    try {
        const result = await db_1.pool.query("SELECT COUNT(*) as count FROM freeboard_comments WHERE parent_id = $1", [commentId]);
        return parseInt(result.rows[0].count);
    }
    catch (error) {
        console.error("getFreeBoardRepliesCountDB error - freeBoardStorage:", error);
        throw new Error("getFreeBoardRepliesCountDB 500error - freeBoardStorage");
    }
};
exports.getFreeBoardRepliesCountDB = getFreeBoardRepliesCountDB;
const updateFreeBoardCommentDB = async (commentId, content, userId) => {
    try {
        // 댓글 작성자 확인
        const authorCheck = await db_1.pool.query("SELECT user_id FROM freeboard_comments WHERE id = $1", [commentId]);
        if (authorCheck.rows.length === 0) {
            throw new Error("댓글을 찾을 수 없습니다.");
        }
        if (authorCheck.rows[0].user_id !== userId) {
            throw new Error("수정 권한이 없습니다.");
        }
        const result = await db_1.pool.query("UPDATE freeboard_comments SET content = $1 WHERE id = $2 RETURNING *", [content, commentId]);
        return result.rows[0];
    }
    catch (error) {
        console.error("updateFreeBoardCommentDB error - freeBoardStorage:", error);
        throw error;
    }
};
exports.updateFreeBoardCommentDB = updateFreeBoardCommentDB;
const deleteFreeBoardCommentDB = async (commentId, userId) => {
    try {
        // 댓글 작성자 확인
        const authorCheck = await db_1.pool.query("SELECT user_id FROM freeboard_comments WHERE id = $1", [commentId]);
        if (authorCheck.rows.length === 0) {
            throw new Error("댓글을 찾을 수 없습니다.");
        }
        if (authorCheck.rows[0].user_id !== userId) {
            throw new Error("삭제 권한이 없습니다.");
        }
        const result = await db_1.pool.query("DELETE FROM freeboard_comments WHERE id = $1", [commentId]);
        return result.rowCount;
    }
    catch (error) {
        console.error("deleteFreeBoardCommentDB error - freeBoardStorage:", error);
        throw error;
    }
};
exports.deleteFreeBoardCommentDB = deleteFreeBoardCommentDB;
// 사용자가 작성한 자유게시판 게시글 조회
const getUserFreeBoardPostsDB = async (userId) => {
    try {
        const result = await db_1.pool.query("SELECT id, title, content, profile_nickname as author, created_at as \"createdAt\", view_count as \"viewCount\" FROM freeBoard WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
        return result.rows;
    }
    catch (error) {
        console.error("getUserFreeBoardPostsDB error - freeBoardStorage:", error);
        throw new Error("getUserFreeBoardPostsDB 500error - freeBoardStorage");
    }
};
exports.getUserFreeBoardPostsDB = getUserFreeBoardPostsDB;
