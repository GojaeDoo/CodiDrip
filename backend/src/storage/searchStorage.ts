import { pool } from "../db";
import { SearchResult } from "../types/userTypes";

export const getSearchResultDB = async (keyword: string): Promise<SearchResult[]> => {
    try {
        const profileResult = await pool.query(
            "SELECT 'profile' as type, profile_id, profile_nickname as name, profile_image as image, user_id FROM profile WHERE profile_nickname LIKE $1",
            [`%${keyword}%`]
        );
        const postResult = await pool.query(
            `SELECT 'post' as type, post_no, post_tag as name, post_image as image, user_id 
             FROM drip_post 
             WHERE post_tag::jsonb ? $1`,
            [keyword]
        );

        const combinedResults: SearchResult[] = [
            ...profileResult.rows.map(row => ({
                type: 'profile' as const,
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
                    } catch (e) {
                        imagePath = row.image;
                    }
                }
                
                return {
                    type: 'post' as const,
                    id: row.post_no,
                    name: row.name,
                    image: imagePath,
                    user_id: row.user_id
                };
            })
        ];

        return combinedResults;
    } catch (error) {
        console.error("getSearchResultDB error - searchStorage:", error);
        throw new Error("getSearchResultDB 500error - searchStorage");
    }
}