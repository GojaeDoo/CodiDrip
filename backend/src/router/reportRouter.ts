import express from "express";
import { 
  createReportController, 
  getReportCountController, 
  checkUserReportedController,
  createFreeBoardReport,
  getAllReportsController,
  getDripReportsController,
  getFreeBoardReportsController,
  processReportController,
  getReportedContentController
} from "../controller/reportController";

const router = express.Router();

// 신고 생성
router.post("/", createReportController);

// 신고 개수 조회
router.get("/count", getReportCountController);

// 사용자가 신고했는지 확인
router.get("/check", checkUserReportedController);

// 자유게시판 신고 라우터
router.post('/freeboard', createFreeBoardReport);

// 관리자용 신고 API
router.get("/admin", getAllReportsController);
router.get("/admin/drip", getDripReportsController);
router.get("/admin/freeboard", getFreeBoardReportsController);
router.post("/admin/:reportId/process", processReportController);
router.get("/admin/content", getReportedContentController);

export default router; 