import express, { RequestHandler } from "express";
import { createDrip, getUserDrip } from "../controller/drip.controller";

const router = express.Router();

// Drip 생성
router.post("/", createDrip as RequestHandler);

// user_id로 Drip 가져오기
router.get("/:id", getUserDrip as RequestHandler);

export default router;
