// src/service/userService.ts
import {
  getUsersFromDB,
  idOverlappingCheckDB,
  joinUserDB,
  emailOverlappingCheckDB,
} from "../storage/userStorage";
import { IdCheckType, User, EmailCheckType } from "../types/userTypes";
import { hashPassword } from "../utils/hashUtil";

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
    const idCheck = await idOverlappingCheckDB(user_id); // user_id만 전달
    return idCheck;
  } catch (error) {
    console.error("아이디 중복 체크 서비스 에러", error);
  }
};

export const emailOverlappingCheck = async ({ user_email }: EmailCheckType) => {
  try {
    const emailCheck = await emailOverlappingCheckDB(user_email); // user_email만 전달
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
