// src/service/userService.ts
import {
  getUsersFromDB,
  idOverlappingCheckDB,
  joinUserDB,
  emailOverlappingCheckDB,
  findUserByCredentialsDB,
} from "../storage/userStorage";
import { IdCheckType, User, EmailCheckType } from "../types/userTypes";
import { hashPassword, comparePassword } from "../utils/hashUtil";
import { generateToken } from "../utils/jwtUtil";

export const getAllUsers = async () => {
  try {
    const user = await getUsersFromDB();
    return user;
  } catch (error) {
    console.error("유저 찾기 서비스 에러");
  }
};

export const idOverlappingCheck = async ({ user_id }: IdCheckType) => {
  try {
    const idCheck = await idOverlappingCheckDB(user_id);
    return idCheck;
  } catch (error) {
    console.error("아이디 중복 체크 서비스 에러", error);
  }
};

export const emailOverlappingCheck = async ({ user_email }: EmailCheckType) => {
  try {
    const emailCheck = await emailOverlappingCheckDB(user_email);
    return emailCheck;
  } catch (error) {
    console.error("이메일 중복 체크 서비스 에러", error);
  }
};

export const createUser = async (user: User) => {
  if (!user.user_password) {
    throw new Error("비밀번호 해싱 서비스 에러");
  }

  const hashedPassword = await hashPassword(user.user_password);
  return joinUserDB({ ...user, user_password: hashedPassword });
};

export const loginUser = async (user_id: string, user_password: string) => {
  try {
    const user = await findUserByCredentialsDB(user_id);
    if (!user) {
      throw new Error("아이디가 존재하지 않습니다.");
    }

    const isPasswordValid = await comparePassword(
      user.user_password,
      user_password
    );
    if (!isPasswordValid) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    // 토큰 생성
    const token = generateToken(user.user_id);

    return {
      user,
      token,
    };
  } catch (error) {
    console.error("로그인 서비스 에러:", error);
    throw error;
  }
};
