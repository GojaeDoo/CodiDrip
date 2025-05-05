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

export const getUserDripDB = async (id: string) => {
  try {
    const result = await pool.query(
      `SELECT user_id , post_image ,post_tag FROM drip_post WHERE user_id = $1;`,
      [id]
    );
    return result.rows;
  } catch (error) {
    console.error("getUserDripDB error - dripStorage:", error);
    throw error;
  }
};
