import pool from "../db"; // db.ts에서 pool 가져오기
import { IdCheckType, User } from "../types/userTypes";

export const getUsersFromDB = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (err) {
    console.error("getUsersFromDB error - userStorage");
    throw err;
  }
};

export const selectUserStorage = async (user_id: string) => {
  try {
    const values = [user_id];
    const result = await pool.query(
      `select user_email FROM users where user_id = $1`,
      values
    );
    return result.rows;
  } catch (error) {
    console.log(error);
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
    console.error("idOverlappingCheckDB error - userStorage");
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
    console.error("emailOverlappingCheckDB error - userStorage");
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
    console.error("findIdCheckDB error - userStorage");
  }
};

export const findPasswordCheckDB = async (
  user_id: string,
  user_email: string
) => {
  try {
    const values = [user_id, user_email];
    const result = await pool.query(
      `SELECT user_password FROM users WHERE user_id = $1 AND user_email = $2;`,
      values
    );
    return result.rows;
  } catch (error) {
    console.error("findPasswordCheckDB error - userStorage");
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
    console.error("joinUserDB error - userStorage");
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
    console.error("findUserByCredentialsDB error - userStorage");
    throw error;
  }
};

export const findUserByEmailDB = async (user_email: string) => {
  try {
    const query = `
      SELECT user_id, user_password, user_email 
      FROM users 
      WHERE user_email = $1
    `;
    const values = [user_email];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("findUserByEmailDB error - userStorage");
    throw error;
  }
};

export const updateUserPasswordDB = async (
  user_email: string,
  user_password: string
) => {
  try {
    const query = `
      UPDATE users 
      SET user_password = $2 
      WHERE user_email = $1 
      RETURNING *
    `;
    const values = [user_email, user_password];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("updateUserPasswordDB error - userStorage");
    throw error;
  }
};
