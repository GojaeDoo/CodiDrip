"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reportController_1 = require("../controller/reportController");
const router = express_1.default.Router();
// 신고 생성
router.post("/", reportController_1.createReportController);
// 신고 개수 조회
router.get("/count", reportController_1.getReportCountController);
// 사용자가 신고했는지 확인
router.get("/check", reportController_1.checkUserReportedController);
// 자유게시판 신고 라우터
router.post('/freeboard', reportController_1.createFreeBoardReport);
// 관리자용 신고 API
router.get("/admin", reportController_1.getAllReportsController);
router.get("/admin/drip", reportController_1.getDripReportsController);
router.get("/admin/freeboard", reportController_1.getFreeBoardReportsController);
router.post("/admin/:reportId/process", reportController_1.processReportController);
router.get("/admin/content", reportController_1.getReportedContentController);
exports.default = router;
