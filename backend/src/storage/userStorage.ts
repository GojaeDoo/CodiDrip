// src/storage/userStorage.ts
import pool from "../db"; // db.ts에서 pool 가져오기

export const getUsersFromDB = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows; // 정상적으로 데이터 반환
  } catch (err) {
    console.error("Database query error:", err); // DB 쿼리 오류 출력
    throw err; // 오류를 호출한 곳으로 다시 전달
  }
};
