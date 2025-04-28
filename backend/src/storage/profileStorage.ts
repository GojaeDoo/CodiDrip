import pool from "../db";
import { Profile } from "../types/profileTypes";

export const getFindAllProfileDB = async (): Promise<Profile[]> => {
  const result = await pool.query(
    `SELECT 
      profile_id,
      profile_nickname,
      profile_height,
      profile_weight,
      profile_image,
      profile_gender,
      profile_follow,
      user_id
    FROM profile
    ORDER BY profile_id DESC`
  );
  return result.rows;
};

export const getFindByIdProfileDB = async (
  id: string
): Promise<Profile | null> => {
  const result = await pool.query(
    `SELECT 
      profile_id,
      profile_nickname,
      profile_image,
      user_id
    FROM profile
    WHERE user_id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

export const getUserProfileByIdDB = async (
  id: string
): Promise<Profile | null> => {
  const result = await pool.query(`SELECT * FROM profile WHERE user_id = $1`, [
    id,
  ]);
  return result.rows[0] || null;
};

export const getCreateProfileDB = async (
  height: number,
  weight: number,
  gender: string,
  nickname: string,
  profileImage: string | null,
  userId: string
): Promise<Profile | null> => {
  try {
    const query = `
      INSERT INTO profiles (height, weight, gender, nickname, profile_image, user_id)
      SELECT $1, $2, $3, $4, $5, $6
      WHERE NOT EXISTS (
        SELECT 1 FROM profiles WHERE user_id = $6
      )
      RETURNING *;
    `;
    const values = [height, weight, gender, nickname, profileImage, userId];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("createProfile error - profileStorage:", error);
    throw error;
  }
};
