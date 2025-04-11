import pool from "../db";
import { Profile } from "../types/profile";

export const getFindAllProfileDB = async (): Promise<Profile[]> => {
  const result = await pool.query(
    `SELECT 
      profile_id,
      profile_nickname,
      profile_height,
      profile_weight,
      profile_image,
      profile_gender,
      profile_follow
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
      profile_height,
      profile_weight,
      profile_image,
      profile_gender,
      profile_follow
    FROM profiles
    WHERE profile_id = $1`,
    [id]
  );
  return result.rows[0] || null;
};
