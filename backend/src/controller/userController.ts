// src/controller/userController.ts
import { Request, Response, NextFunction } from "express";
import { IdCheckType, User, EmailCheckType } from "../types/userTypes";

import {
  createUser,
  getAllUsers,
  idOverlappingCheck,
  emailOverlappingCheck,
  findIdCheck,
  loginUser,
} from "../service/userService";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await getAllUsers();
    res.json(user); //
  } catch (err) {
    res.status(500).json({ error: "유저 찾는거 컨트롤러 에러" });
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
