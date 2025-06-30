// src/service/userService.ts
import {
  getUsersFromDB,
  idOverlappingCheckDB,
  joinUserDB,
  emailOverlappingCheckDB,
  findUserByCredentialsDB,
  findIdCheckDB,
  findPasswordCheckDB,
  selectUserStorage,
  findUserByEmailDB,
  updateUserPasswordDB,
  checkFollowStatusDB,
  toggleFollowDB,
  getFollowersDB,
  getFollowingDB,
  checkUserAdminStatus,
} from "../storage/userStorage";
import {
  IdCheckType,
  User,
  EmailCheckType,
  PasswordFindType,
} from "../types/userTypes";
import { hashPassword, comparePassword } from "../utils/hashUtil";
import { generateToken } from "../utils/jwtUtil";
import {
  generateVerificationCode,
  sendVerificationEmail,
} from "../utils/emailUtil";
import { createVerificationCode } from "./verificationService";
import { verifyCode } from "./verificationService";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  try {
    const user = await getUsersFromDB();
    return user;
  } catch (error) {
    console.error("getAllUsers error - userService");
  }
};

export const selectUserService = async ({ user_id }: IdCheckType) => {
  try {
    const selectUser = await selectUserStorage(user_id);
    if (!selectUser) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
    return selectUser;
  } catch (error) {
    console.error("selectUserService error - userService");
    throw error;
  }
};

export const idOverlappingCheck = async ({ user_id }: IdCheckType) => {
  try {
    const idCheck = await idOverlappingCheckDB(user_id);
    return idCheck;
  } catch (error) {
    console.error("idOverlappingCheck error - userService");
  }
};

export const emailOverlappingCheck = async ({ user_email }: EmailCheckType) => {
  try {
    const emailCheck = await emailOverlappingCheckDB(user_email);
    return emailCheck;
  } catch (error) {
    console.error("emailOverlappingCheck error - userService");
  }
};

export const findIdCheck = async ({ user_email }: EmailCheckType) => {
  try {
    const findId = await findIdCheckDB(user_email);
    return findId;
  } catch (error) {
    console.error("findIdCheck error - userService");
  }
};

export const findPasswordCheck = async ({
  user_id,
  user_email,
}: PasswordFindType) => {
  try {
    const findPassword = await findPasswordCheckDB(user_id, user_email);

    // DB에서 일치하는 사용자가 있는지 확인
    if (findPassword && findPassword.length > 0) {
      // 인증번호 생성
      const verificationCode = createVerificationCode(user_email);

      // 이메일 발송
      await sendVerificationEmail(user_email, verificationCode);

      return {
        success: true,
        message: "인증번호가 이메일로 발송되었습니다.",
      };
    }

    return {
      success: false,
      message: "일치하는 사용자 정보가 없습니다.",
    };
  } catch (error) {
    console.error("findPasswordCheck error - userService");
    throw error;
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

    console.log("=== loginUser 서비스 ===");
    console.log("반환할 사용자 정보:", user);
    console.log("is_admin 값:", user.is_admin);
    console.log("is_admin 타입:", typeof user.is_admin);
    console.log("=== loginUser 서비스 끝 ===");

    return {
      user,
      token,
    };
  } catch (error) {
    console.error("loginUser error - userService");
    throw error;
  }
};

// 인증번호 검증 서비스
export const verifyPasswordCode = async (email: string, code: string) => {
  try {
    const isValid = verifyCode(email, code);

    if (isValid) {
      return {
        success: true,
        message: "인증이 완료되었습니다.",
      };
    }

    return {
      success: false,
      message: "인증번호가 일치하지 않거나 만료되었습니다.",
    };
  } catch (error) {
    console.error("verifyPasswordCode error - userService");
    throw error;
  }
};

export const resetPasswordService = async (email: string, password: string) => {
  try {
    const user = await findUserByEmailDB(email);
    if (!user) {
      throw new Error("존재하지 않는 이메일입니다.");
    }

    const hashedPassword = await hashPassword(password);
    await updateUserPasswordDB(email, hashedPassword);

    return { success: true, message: "비밀번호가 재설정되었습니다." };
  } catch (error) {
    throw error;
  }
};

// 팔로우 상태 확인 서비스
export const checkFollowStatusService = async (followerId: string, followeeId: string) => {
  try {
    const isFollowing = await checkFollowStatusDB(followerId, followeeId);
    return { isFollowing };
  } catch (error) {
    console.error("checkFollowStatusService error - userService");
    throw error;
  }
};

// 팔로우 토글 서비스
export const toggleFollowService = async (followerId: string, followeeId: string) => {
  try {
    // 자기 자신을 팔로우하려는 경우 방지
    if (followerId === followeeId) {
      throw new Error("자기 자신을 팔로우할 수 없습니다.");
    }

    const result = await toggleFollowDB(followerId, followeeId);
    return result;
  } catch (error) {
    console.error("toggleFollowService error - userService");
    throw error;
  }
};

// 팔로워 목록 가져오기 서비스
export const getFollowersService = async (userId: string) => {
  try {
    const followers = await getFollowersDB(userId);
    return followers;
  } catch (error) {
    console.error("getFollowersService error - userService");
    throw error;
  }
};

// 팔로잉 목록 가져오기 서비스
export const getFollowingService = async (userId: string) => {
  try {
    const following = await getFollowingDB(userId);
    return following;
  } catch (error) {
    console.error("getFollowingService error - userService");
    throw error;
  }
};

// 사용자 관리자 상태 확인 서비스
export const checkUserAdminStatusService = async (userId: string) => {
  try {
    const user = await checkUserAdminStatus(userId);
    return user;
  } catch (error) {
    console.error("checkUserAdminStatusService error - userService");
    throw error;
  }
};
