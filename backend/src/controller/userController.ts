// src/controller/userController.ts
import { Request, Response, NextFunction } from "express";
import { IdCheckType, User } from "../types/userTypes";

import {
  createUser,
  getAllUsers,
  idOverlappingCheck,
} from "../service/userService";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await getAllUsers();
    res.json(user); // 성공적으로 데이터를 반환
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

export const postUserJoin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("회원가입 데이터:", req.body);

    const { user_id, user_password, user_email } = req.body;

    const newUser = await createUser({ user_id, user_password, user_email });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("회원가입 실패:", error);
    next(error);
  }
};
