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
) => {
  try {
    const { id } = req.body;
    // user_id가 없을 경우 빈 문자열 처리
    const idCheck = await idOverlappingCheck(id); // IdCheckType 형식으로 객체 전달

    res.json(idCheck);
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
    console.log("📌 요청된 데이터:", req.body); // 추가

    const { user_id, user_password, user_email } = req.body;

    const newUser = await createUser({ user_id, user_password, user_email });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("❌ 회원가입 실패:", error);
    next(error);
  }
};
