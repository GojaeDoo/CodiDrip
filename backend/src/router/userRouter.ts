// src/router/userRouter.ts
import { Router } from "express";
import { getUsers } from "../controller/userController";

const router = Router();

router.get("/", getUsers); // 사용자 목록 가져오기

export default router;
