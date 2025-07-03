"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFreeBoardSearchDB = exports.getSearchResultDB = void 0;
const db_1 = require("../db");
const getSearchResultDB = async (keyword) => {
    try {
        const profileResult = await db_1.pool.query("SELECT 'profile' as type, profile_id, profile_nickname as name, profile_image as image, user_id FROM profile WHERE profile_nickname LIKE $1", [`%${keyword}%`]);
        const postResult = await db_1.pool.query(`SELECT 'post' as type, post_no, post_tag as name, post_image as image, user_id 
             FROM drip_post 
             WHERE post_tag::jsonb ? $1`, [keyword]);
        const combinedResults = [
            ...profileResult.rows.map(row => ({
                type: 'profile',
                id: row.profile_id,
                name: row.name,
                image: row.image,
                user_id: row.user_id
            })),
            ...postResult.rows.map(row => {
                let imagePath = row.image;
                if (row.image && typeof row.image === 'string') {
                    try {
                        const imageArray = JSON.parse(row.image);
                        if (Array.isArray(imageArray) && imageArray.length > 0) {
                            imagePath = imageArray[0];
                        }
                    }
                    catch (e) {
                        imagePath = row.image;
                    }
                }
                return {
                    type: 'post',
                    id: row.post_no,
                    name: row.name,
                    image: imagePath,
                    user_id: row.user_id
                };
            })
        ];
        return combinedResults;
    }
    catch (error) {
        console.error("getSearchResultDB error - searchStorage:", error);
        throw new Error("getSearchResultDB 500error - searchStorage");
    }
};
exports.getSearchResultDB = getSearchResultDB;
const getFreeBoardSearchDB = async (keyword) => {
    try {
        const result = await db_1.pool.query(`SELECT id, title, profile_nickname as author, created_at as "createdAt", view_count as "viewCount" 
             FROM freeBoard 
             WHERE title ILIKE $1 OR content ILIKE $1 OR profile_nickname ILIKE $1
             ORDER BY created_at DESC`, [`%${keyword}%`]);
        return result.rows;
    }
    catch (error) {
        console.error("getFreeBoardSearchDB error - searchStorage:", error);
        throw new Error("getFreeBoardSearchDB 500error - searchStorage");
    }
};
exports.getFreeBoardSearchDB = getFreeBoardSearchDB;
