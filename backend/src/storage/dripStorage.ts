import { v4 as uuidv4 } from "uuid";
import pool from "../db";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads/drip");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const uploadDripImage = async (
  buffer: Buffer,
  contentType: string
): Promise<string> => {
  try {
    const extension = contentType.split("/")[1] || "jpg";
    const filename = `${uuidv4()}.${extension}`;
    const filepath = path.join(uploadDir, filename);

    await fs.promises.writeFile(filepath, buffer);

    return `/${filename}`;
  } catch (error) {
    console.error("uploadDripImage error - dripStorage:", error);
    throw error;
  }
};

export const createDripDB = async (
  images: string[],
  tags: string[],
  userId: string
) => {
  try {
    const result = await pool.query(
      `INSERT INTO drip_post (post_image, post_tag, user_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [JSON.stringify(images), JSON.stringify(tags), userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("createDrip error - dripStorage:", error);
    throw error;
  }
};

export const getUserDripPost = async (userId?: string) => {
  try {
    let query = `
      SELECT 
        p.post_no AS 게시글번호,
        p.post_image AS 게시글이미지,
        p.post_tag AS 태그,
        p.user_id,
        pr.profile_image AS 프로필이미지,
        pr.profile_nickname AS 닉네임
      FROM drip_post p
      JOIN profile pr ON p.user_id = pr.user_id
    `;

    // userId가 있으면 해당 사용자의 게시물만 가져오고, 없으면 모든 게시물을 가져옴
    if (userId) {
      query += ` WHERE p.user_id = $1`;
    }

    query += ` ORDER BY p.post_no DESC`;

    const result = await pool.query(query, userId ? [userId] : []);
    return result.rows;
  } catch (error) {
    console.error("Error in getUserDripPost:", error);
    throw error;
  }
};
