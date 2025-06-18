import { pool } from "../db"; // db.ts에서 pool 가져오기
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

// 팔로우 상태 확인
export const checkFollowStatusDB = async (followerId: string, followeeId: string) => {
  try {
    const query = `
      SELECT id FROM user_follow 
      WHERE follower_id = $1 AND followee_id = $2
    `;
    const values = [followerId, followeeId];
    const result = await pool.query(query, values);
    return result.rows.length > 0;
  } catch (error) {
    console.error("checkFollowStatusDB error - userStorage");
    throw error;
  }
};

// 팔로우 추가
export const addFollowDB = async (followerId: string, followeeId: string) => {
  try {
    const query = `
      INSERT INTO user_follow (follower_id, followee_id)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [followerId, followeeId];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("addFollowDB error - userStorage");
    throw error;
  }
};

// 팔로우 삭제
export const removeFollowDB = async (followerId: string, followeeId: string) => {
  try {
    const query = `
      DELETE FROM user_follow 
      WHERE follower_id = $1 AND followee_id = $2
      RETURNING *
    `;
    const values = [followerId, followeeId];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("removeFollowDB error - userStorage");
    throw error;
  }
};

// 팔로우 토글 (팔로우 상태에 따라 추가/삭제)
export const toggleFollowDB = async (followerId: string, followeeId: string) => {
  try {
    const isFollowing = await checkFollowStatusDB(followerId, followeeId);
    
    if (isFollowing) {
      // 이미 팔로우 중이면 언팔로우
      await removeFollowDB(followerId, followeeId);
      return { isFollowing: false, action: 'unfollowed' };
    } else {
      // 팔로우하지 않았으면 팔로우
      await addFollowDB(followerId, followeeId);
      return { isFollowing: true, action: 'followed' };
    }
  } catch (error) {
    console.error("toggleFollowDB error - userStorage");
    throw error;
  }
};

// 팔로워 목록 가져오기 (나를 팔로우하는 사람들)
export const getFollowersDB = async (userId: string) => {
  try {
    const query = `
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
      FROM user_follow uf
      JOIN profile p ON uf.follower_id = p.user_id
      WHERE uf.followee_id = $1
      ORDER BY uf.id DESC
    `;
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("getFollowersDB error - userStorage");
    throw error;
  }
};

// 팔로잉 목록 가져오기 (내가 팔로우하는 사람들)
export const getFollowingDB = async (userId: string) => {
  try {
    const query = `
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
      FROM user_follow uf
      JOIN profile p ON uf.followee_id = p.user_id
      WHERE uf.follower_id = $1
      ORDER BY uf.id DESC
    `;
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("getFollowingDB error - userStorage");
    throw error;
  }
};
