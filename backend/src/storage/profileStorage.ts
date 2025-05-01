import pool from "../db";
import { Profile } from "../types/profileTypes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
      user_id,
      profile_about
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
      user_id,
      profile_about,
      profile_height,
      profile_weight,
      profile_gender
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
    if (!profileImage) {
      throw new Error("프로필 이미지가 필요합니다.");
    }

    const query = `
      INSERT INTO profile (
        profile_height, 
        profile_weight, 
        profile_gender, 
        profile_nickname, 
        profile_image, 
        user_id,
        profile_follow
      )
      VALUES ($1, $2, $3, $4, $5, $6, 0)
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

export const updateProfile = async (
  height: number,
  weight: number,
  gender: string,
  nickname: string,
  profileImage: string,
  userId: string
) => {
  try {
    const query = `
      UPDATE profile 
      SET 
        profile_height = $1,
        profile_weight = $2,
        profile_gender = $3,
        profile_nickname = $4,
        profile_image = $5
      WHERE user_id = $6
      RETURNING *;
    `;
    const values = [height, weight, gender, nickname, profileImage, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("프로필 수정 중 오류 발생:", error);
    throw error;
  }
};
