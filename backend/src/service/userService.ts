// src/service/userService.ts
import {
  getUsersFromDB,
  idOverlappingCheckDB,
  joinUserDB,
} from "../storage/userStorage";
import { IdCheckType, User } from "../types/userTypes";
import { hashPassword } from "../utils/hashUtil";

export const getAllUsers = async () => {
  try {
    const user = await getUsersFromDB();
    return user;
  } catch (error) {
    console.error("유저 찾기 서비스 에러");
  }
};

export const idOverlappingCheck = async (id: IdCheckType) => {
  try {
    const idCheck = await idOverlappingCheckDB(id);
    return idCheck;
  } catch (error) {
    console.error("아이디 중복 체크 서비스 에러");
  }
};

export const createUser = async (user: User) => {
  if (!user.user_password) {
    throw new Error("비밀번호 해싱 서비스 에러");
  }

  const hashedPassword = await hashPassword(user.user_password);
  return joinUserDB({ ...user, user_password: hashedPassword });
};
