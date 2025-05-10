import express, { RequestHandler } from "express";
import {
  createDrip,
  getPostNoDrip,
  getUserDrip,
  updateDrip,
} from "../controller/dripController";

const router = express.Router();

// Drip 생성
router.post("/", createDrip as RequestHandler);

// Drip 가져오기 (userId 쿼리 파라미터로 필터링)
router.get("/", getUserDrip as RequestHandler);

router.get("/:postNo", getPostNoDrip);

// Drip 수정
router.put("/:postNo", updateDrip as RequestHandler);

export default router;
