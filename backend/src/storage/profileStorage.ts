import { pool } from "../db";
import { Profile } from "../types/profileTypes";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const getFindAllProfileDB = async (
  gender?: string
): Promise<Profile[]> => {
  try {
    let query = `
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
      FROM profile p
    `;

    const params: any[] = [];
    const conditions: string[] = [];

    if (gender) {
      conditions.push("p.profile_gender = $" + (params.length + 1));
      params.push(gender);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY p.profile_id DESC";

    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error("Error in getFindAllProfileDB:", error);
    throw error;
  }
};

export const getFindByIdProfileDB = async (
  id: string
): Promise<Profile | null> => {
  const result = await pool.query(
    `SELECT 
  p.profile_id,
  p.profile_nickname,
  p.profile_image,
  p.user_id,
  p.profile_about,
  p.profile_height,
  p.profile_weight,
  p.profile_gender,
  p.profile_follow,
  COUNT(dp.post_no) AS post_count
FROM profile p
LEFT JOIN drip_post dp ON dp.user_id = p.user_id
WHERE p.user_id = $1
GROUP BY 
  p.profile_id,
  p.profile_nickname,
  p.profile_image,
  p.user_id,
  p.profile_about,
  p.profile_height,
  p.profile_weight,
  p.profile_gender,
  p.profile_follow;`,
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
  userId: string,
  profileAbout: string
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
        profile_about
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [height, weight, gender, nickname, profileImage, userId, profileAbout];
    console.log("DB 입력 값:", values);
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
  userId: string,
  profileAbout: string
) => {
  try {
    // 기존 프로필 이미지 조회
    const prevResult = await pool.query(
      `SELECT profile_image FROM profile WHERE user_id = $1`,
      [userId]
    );
    let prevImage: string | null = null;
    if (prevResult.rows.length > 0) {
      prevImage = prevResult.rows[0].profile_image;
    }
    // 기존 이미지와 새 이미지가 다르고, 기존 이미지가 존재하면 삭제
    if (
      prevImage &&
      prevImage !== profileImage &&
      typeof prevImage === "string" &&
      !prevImage.startsWith("data:")
    ) {
      const filePath = path.join(
        process.cwd(),
        "uploads/profiles",
        prevImage.trim()
      );
      console.log("프로필 이미지 삭제 시도:", filePath);
      fs.promises
        .unlink(filePath)
        .then(() => {
          console.log("프로필 이미지 파일 삭제 성공:", filePath);
        })
        .catch((err) => {
          console.error("프로필 이미지 파일 삭제 실패:", filePath, err.message);
        });
    }

    const query = `
      UPDATE profile 
      SET 
        profile_height = $1,
        profile_weight = $2,
        profile_gender = $3,
        profile_nickname = $4,
        profile_image = $5,
        profile_about = $6
      WHERE user_id = $7
      RETURNING *;
    `;
    const values = [height, weight, gender, nickname, profileImage, profileAbout, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("프로필 수정 중 오류 발생:", error);
    throw error;
  }
};
