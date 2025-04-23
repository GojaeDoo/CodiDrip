// src/controller/userController.ts
import { Request, Response, NextFunction } from "express";
import {
  IdCheckType,
  User,
  EmailCheckType,
  PasswordFindType,
} from "../types/userTypes";

import {
  createUser,
  getAllUsers,
  idOverlappingCheck,
  emailOverlappingCheck,
  findIdCheck,
  loginUser,
  findPasswordCheck,
  verifyPasswordCode,
  selectUserService,
} from "../service/userService";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await getAllUsers();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "유저 찾는거 컨트롤러 에러" });
  }
};

export const getSelectUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(400).json({ error: "id가 필요합니다." });
      return;
    }
    const SelectUser = await selectUserService({
      user_id: id as string,
    });
    res.json(SelectUser);
  } catch (error) {
    console.error("사용자 조회 실패:", error);
    res.status(500).json({ error: "사용자 조회 중 오류가 발생했습니다." });
  }
};

export const getIdOverlappingCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user_id } = req.query;

    if (!user_id || typeof user_id !== "string") {
      res.status(400).json({ error: "유효하지 않은 user_id" });
      return;
    }

    const idCheck: any = await idOverlappingCheck({
      user_id: user_id as string,
    });

    const OverlappingCheck: string = idCheck.length;

    res.json({ exists: OverlappingCheck });
  } catch (error) {
    res.status(500).json({ error: "아이디 중복 체크 컨트롤러 에러" });
  }
};

export const getEmailOverlappingCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user_email } = req.query;

    if (!user_email || typeof user_email !== "string") {
      res.status(400).json({ error: "유효하지 않은 user_email" });
      return;
    }

    const emailCheck: any = await emailOverlappingCheck({
      user_email: user_email as string,
    });

    const OverlappingCheck: string = emailCheck.length;

    res.json({ exists: OverlappingCheck });
  } catch (error) {
    res.status(500).json({ error: "이메일 중복 체크 컨트롤러 에러" });
  }
};

export const getFindId = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const findId = await findIdCheck({
      user_email: email as string,
    });

    res.json({ findId });
  } catch (error) {
    console.error("아이디 찾기 실패:", error);
    res.status(500).json({ error: "아이디 찾기 중 오류가 발생했습니다." });
  }
};

export const getFindPassword = async (req: Request, res: Response) => {
  try {
    const { id, email } = req.query;

    const findPassword = await findPasswordCheck({
      user_id: id as string,
      user_email: email as string,
    });

    res.json({ findPassword });
  } catch (error) {
    console.error("비밀번호 찾기 실패:", error);
    res.status(500).json({ error: "비밀번호 찾기 중 오류가 발생했습니다." });
  }
};

export const postUserJoin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData: User = req.body;
    console.log("회원가입 데이터:", userData);

    const result = await createUser(userData);
    res.json(result);
  } catch (error: any) {
    if (error.code === "23505" && error.constraint === "users_user_email_key") {
      res.status(400).json({ error: "이미 사용 중인 이메일입니다." });
    } else {
      console.error("회원가입 실패:", error);
      res.status(500).json({ error: "회원가입 중 오류가 발생했습니다." });
    }
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user_id, user_password } = req.body;

    if (!user_id || !user_password) {
      res.status(400).json({ error: "아이디와 비밀번호를 모두 입력해주세요." });
      return;
    }

    const result = await loginUser(user_id, user_password);
    res.status(200).json({
      message: "로그인 성공",
      user: result.user,
      token: result.token,
    });
  } catch (error: any) {
    console.error("로그인 컨트롤러 에러:", error);
    res.status(401).json({ error: error.message });
  }
};

export const verifyPasswordCodeController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      res.status(400).json({ error: "이메일과 인증번호를 모두 입력해주세요." });
      return;
    }

    const result = await verifyPasswordCode(email, code);
    res.json(result);
  } catch (error) {
    console.error("인증번호 검증 실패:", error);
    res.status(500).json({ error: "인증번호 검증 중 오류가 발생했습니다." });
  }
};
