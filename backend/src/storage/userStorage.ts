import pool from "../db"; // db.ts에서 pool 가져오기
import { IdCheckType, User } from "../types/userTypes";

export const getUsersFromDB = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  }
};

export const idOverlappingCheckDB = async (user_id: string) => {
  try {
    const values = [user_id];
    const result = await pool.query(
      `SELECT user_id FROM users WHERE user_id = $1;`,
      values
    );
    return result.rows;
  } catch (error) {
    console.error("DB 조회 실패 아이디 중복 체크", error);
  }
};

export const emailOverlappingCheckDB = async (user_email: string) => {
  try {
    const values = [user_email];
    const result = await pool.query(
      `SELECT user_email FROM users WHERE user_email = $1;`,
      values
    );
    return result.rows;
  } catch (error) {
    console.error("DB 조회 실패 이메일 중복 체크", error);
  }
};

export const findIdCheckDB = async (user_email: string) => {
  try {
    const values = [user_email];
    const result = await pool.query(
      `SELECT user_id FROM users WHERE user_email = $1;`,
      values
    );
    return result.rows;
  } catch (error) {
    console.error("DB 조회 실패 아이디 찾기", error);
  }
};

export const joinUserDB = async (user: User) => {
  try {
    const query = `
      INSERT INTO users (user_id, user_password, user_email)
      VALUES ($1, $2, $3) RETURNING *  -- 추가됨
    `;
    const values = [user.user_id, user.user_password, user.user_email];

    const result = await pool.query(query, values);
    return result.rows[0]; // 저장된 사용자 데이터 반환
  } catch (err) {
    console.error("Database insert error:", err);
    throw err;
  }
};

export const findUserByCredentialsDB = async (user_id: string) => {
  try {
    const query = `
      SELECT user_id, user_password, user_email 
      FROM users 
      WHERE user_id = $1
    `;
    const values = [user_id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("로그인 DB 조회 실패:", error);
    throw error;
  }
};
