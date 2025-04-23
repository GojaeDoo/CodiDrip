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

export const getAllUsers = async () => {
  try {
    const user = await getUsersFromDB();
    return user;
  } catch (error) {
    console.error("유저 찾기 서비스 에러");
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
    console.error("사용자 조회 서비스 에러:", error);
    throw error;
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

export const findIdCheck = async ({ user_email }: EmailCheckType) => {
  try {
    const findId = await findIdCheckDB(user_email);
    return findId;
  } catch (error) {
    console.error("아이디 찾기 서비스 에러", error);
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
      // 인증번호 생성 및 저장
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
    console.error("비밀번호 찾기 서비스 에러", error);
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

    return {
      user,
      token,
    };
  } catch (error) {
    console.error("로그인 서비스 에러:", error);
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
    console.error("인증번호 검증 서비스 에러", error);
    throw error;
  }
};
