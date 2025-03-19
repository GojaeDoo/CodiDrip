// src/controller/userController.ts
import { Request, Response } from "express";
import { getAllUsers } from "../service/userService";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await getAllUsers();
    res.json(user); // 성공적으로 데이터를 반환
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
