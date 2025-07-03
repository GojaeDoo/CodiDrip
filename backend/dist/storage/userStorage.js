"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserAdminStatus = exports.getFollowingDB = exports.getFollowersDB = exports.toggleFollowDB = exports.removeFollowDB = exports.addFollowDB = exports.checkFollowStatusDB = exports.postUpdatePasswordStorage = exports.findUserByEmailDB = exports.postLoginUserStorage = exports.postUserJoinStorage = exports.getFindPasswordCheckStorage = exports.getFindIdStorage = exports.getEmailOverlappingCheckStorage = exports.getIdOverlappingCheckStorage = exports.selectUserStorage = exports.getUsersFromDB = void 0;
const db_1 = require("../db"); // db.ts에서 pool 가져오기
const getUsersFromDB = async () => {
    try {
        const result = await db_1.pool.query("SELECT * FROM users");
        return result.rows;
    }
    catch (err) {
        console.error("getUsersFromDB error - userStorage");
        throw err;
    }
};
exports.getUsersFromDB = getUsersFromDB;
const selectUserStorage = async (user_id) => {
    try {
        const values = [user_id];
        const result = await db_1.pool.query(`select user_email FROM users where user_id = $1`, values);
        return result.rows;
    }
    catch (error) {
        console.log(error);
    }
};
exports.selectUserStorage = selectUserStorage;
const getIdOverlappingCheckStorage = async (user_id) => {
    try {
        const values = [user_id];
        const result = await db_1.pool.query(`SELECT user_id FROM users WHERE user_id = $1;`, values);
        return result.rows;
    }
    catch (error) {
        console.error("idOverlappingCheckDB error - userStorage");
    }
};
exports.getIdOverlappingCheckStorage = getIdOverlappingCheckStorage;
const getEmailOverlappingCheckStorage = async (user_email) => {
    try {
        const values = [user_email];
        const result = await db_1.pool.query(`SELECT user_email FROM users WHERE user_email = $1;`, values);
        return result.rows;
    }
    catch (error) {
        console.error("emailOverlappingCheckDB error - userStorage");
    }
};
exports.getEmailOverlappingCheckStorage = getEmailOverlappingCheckStorage;
const getFindIdStorage = async (user_email) => {
    try {
        const values = [user_email];
        const result = await db_1.pool.query(`SELECT user_id FROM users WHERE user_email = $1;`, values);
        return result.rows;
    }
    catch (error) {
        console.error("findIdCheckDB error - userStorage");
    }
};
exports.getFindIdStorage = getFindIdStorage;
const getFindPasswordCheckStorage = async (user_id, user_email) => {
    try {
        const values = [user_id, user_email];
        const result = await db_1.pool.query(`SELECT user_password FROM users WHERE user_id = $1 AND user_email = $2;`, values);
        return result.rows;
    }
    catch (error) {
        console.error("findPasswordCheckDB error - userStorage");
    }
};
exports.getFindPasswordCheckStorage = getFindPasswordCheckStorage;
const postUserJoinStorage = async (user) => {
    try {
        const query = `
      INSERT INTO users (user_id, user_password, user_email)
      VALUES ($1, $2, $3) RETURNING *  -- 추가됨
    `;
        const values = [user.user_id, user.user_password, user.user_email];
        const result = await db_1.pool.query(query, values);
        return result.rows[0]; // 저장된 사용자 데이터 반환
    }
    catch (err) {
        console.error("joinUserDB error - userStorage");
        throw err;
    }
};
exports.postUserJoinStorage = postUserJoinStorage;
const postLoginUserStorage = async (user_id) => {
    try {
        const query = `
      SELECT user_id, user_password, user_email, is_admin 
      FROM users 
      WHERE user_id = $1
    `;
        const values = [user_id];
        const result = await db_1.pool.query(query, values);
        const user = result.rows[0] || null;
        return user;
    }
    catch (error) {
        console.error("findUserByCredentialsDB error - userStorage");
        throw error;
    }
};
exports.postLoginUserStorage = postLoginUserStorage;
const findUserByEmailDB = async (user_email) => {
    try {
        const query = `
      SELECT user_id, user_password, user_email 
      FROM users 
      WHERE user_email = $1
    `;
        const values = [user_email];
        const result = await db_1.pool.query(query, values);
        return result.rows[0] || null;
    }
    catch (error) {
        console.error("findUserByEmailDB error - userStorage");
        throw error;
    }
};
exports.findUserByEmailDB = findUserByEmailDB;
const postUpdatePasswordStorage = async (user_email, user_password) => {
    try {
        const query = `
      UPDATE users 
      SET user_password = $2 
      WHERE user_email = $1 
      RETURNING *
    `;
        const values = [user_email, user_password];
        const result = await db_1.pool.query(query, values);
        return result.rows[0] || null;
    }
    catch (error) {
        console.error("updateUserPasswordDB error - userStorage");
        throw error;
    }
};
exports.postUpdatePasswordStorage = postUpdatePasswordStorage;
// 팔로우 상태 확인
const checkFollowStatusDB = async (followerId, followeeId) => {
    try {
        const query = `
      SELECT id FROM user_follow 
      WHERE follower_id = $1 AND followee_id = $2
    `;
        const values = [followerId, followeeId];
        const result = await db_1.pool.query(query, values);
        return result.rows.length > 0;
    }
    catch (error) {
        console.error("checkFollowStatusDB error - userStorage");
        throw error;
    }
};
exports.checkFollowStatusDB = checkFollowStatusDB;
// 팔로우 추가
const addFollowDB = async (followerId, followeeId) => {
    try {
        const query = `
      INSERT INTO user_follow (follower_id, followee_id)
      VALUES ($1, $2)
      RETURNING *
    `;
        const values = [followerId, followeeId];
        const result = await db_1.pool.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error("addFollowDB error - userStorage");
        throw error;
    }
};
exports.addFollowDB = addFollowDB;
// 팔로우 삭제
const removeFollowDB = async (followerId, followeeId) => {
    try {
        const query = `
      DELETE FROM user_follow 
      WHERE follower_id = $1 AND followee_id = $2
      RETURNING *
    `;
        const values = [followerId, followeeId];
        const result = await db_1.pool.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error("removeFollowDB error - userStorage");
        throw error;
    }
};
exports.removeFollowDB = removeFollowDB;
// 팔로우 토글 (팔로우 상태에 따라 추가/삭제)
const toggleFollowDB = async (followerId, followeeId) => {
    try {
        const isFollowing = await (0, exports.checkFollowStatusDB)(followerId, followeeId);
        if (isFollowing) {
            // 이미 팔로우 중이면 언팔로우
            await (0, exports.removeFollowDB)(followerId, followeeId);
            return { isFollowing: false, action: 'unfollowed' };
        }
        else {
            // 팔로우하지 않았으면 팔로우
            await (0, exports.addFollowDB)(followerId, followeeId);
            return { isFollowing: true, action: 'followed' };
        }
    }
    catch (error) {
        console.error("toggleFollowDB error - userStorage");
        throw error;
    }
};
exports.toggleFollowDB = toggleFollowDB;
// 팔로워 목록 가져오기 (나를 팔로우하는 사람들)
const getFollowersDB = async (userId) => {
    try {
        const query = `
      SELECT 
        p.profile_id,
        p.profile_nickname,
        p.profile_height,
        p.profile_weight,
        p.profile_image,
        p.profile_gender,
        p.profile_follow,
        p.user_id,
        p.profile_about
      FROM user_follow uf
      JOIN profile p ON uf.follower_id = p.user_id
      WHERE uf.followee_id = $1
      ORDER BY uf.id DESC
    `;
        const values = [userId];
        const result = await db_1.pool.query(query, values);
        return result.rows;
    }
    catch (error) {
        console.error("getFollowersDB error - userStorage");
        throw error;
    }
};
exports.getFollowersDB = getFollowersDB;
// 팔로잉 목록 가져오기 (내가 팔로우하는 사람들)
const getFollowingDB = async (userId) => {
    try {
        const query = `
      SELECT 
        p.profile_id,
        p.profile_nickname,
        p.profile_height,
        p.profile_weight,
        p.profile_image,
        p.profile_gender,
        p.profile_follow,
        p.user_id,
        p.profile_about
      FROM user_follow uf
      JOIN profile p ON uf.followee_id = p.user_id
      WHERE uf.follower_id = $1
      ORDER BY uf.id DESC
    `;
        const values = [userId];
        const result = await db_1.pool.query(query, values);
        return result.rows;
    }
    catch (error) {
        console.error("getFollowingDB error - userStorage");
        throw error;
    }
};
exports.getFollowingDB = getFollowingDB;
// 사용자 is_admin 값 확인 함수 추가
const checkUserAdminStatus = async (user_id) => {
    try {
        const query = `
      SELECT user_id, is_admin 
      FROM users 
      WHERE user_id = $1
    `;
        const values = [user_id];
        const result = await db_1.pool.query(query, values);
        const user = result.rows[0] || null;
        return user;
    }
    catch (error) {
        console.error("checkUserAdminStatus error - userStorage");
        throw error;
    }
};
exports.checkUserAdminStatus = checkUserAdminStatus;
