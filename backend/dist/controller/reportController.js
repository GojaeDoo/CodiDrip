"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportedContentController = exports.processReportController = exports.getFreeBoardReportsController = exports.getDripReportsController = exports.getAllReportsController = exports.createFreeBoardReport = exports.checkUserReportedController = exports.getReportCountController = exports.createReportController = void 0;
const reportService_1 = require("../service/reportService");
const jwtUtil_1 = require("../utils/jwtUtil");
const createReportController = async (req, res) => {
    try {
        const { targetType, targetId, reportReason } = req.body;
        // 토큰에서 사용자 ID 추출
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({
                success: false,
                message: "로그인이 필요합니다."
            });
            return;
        }
        let reporterId;
        try {
            const decoded = (0, jwtUtil_1.verifyToken)(token);
            reporterId = decoded.userId;
        }
        catch (error) {
            res.status(403).json({
                success: false,
                message: "유효하지 않은 토큰입니다."
            });
            return;
        }
        if (!targetType || !targetId || !reportReason) {
            res.status(400).json({
                success: false,
                message: "필수 입력 항목이 누락되었습니다."
            });
            return;
        }
        const reportData = {
            targetType,
            targetId,
            reporterId,
            reportReason
        };
        const result = await (0, reportService_1.createReport)(reportData);
        if (result.success) {
            res.status(201).json(result);
        }
        else {
            res.status(400).json(result);
        }
    }
    catch (error) {
        console.error("createReportController error:", error);
        res.status(500).json({
            success: false,
            message: "서버 오류가 발생했습니다."
        });
    }
};
exports.createReportController = createReportController;
const getReportCountController = async (req, res) => {
    try {
        const { targetType, targetId } = req.query;
        if (!targetType || !targetId) {
            res.status(400).json({
                success: false,
                message: "필수 파라미터가 누락되었습니다."
            });
            return;
        }
        const count = await (0, reportService_1.getReportCount)(targetType, parseInt(targetId));
        res.status(200).json({
            success: true,
            count
        });
    }
    catch (error) {
        console.error("getReportCountController error:", error);
        res.status(500).json({
            success: false,
            message: "서버 오류가 발생했습니다."
        });
    }
};
exports.getReportCountController = getReportCountController;
const checkUserReportedController = async (req, res) => {
    try {
        const { targetType, targetId } = req.query;
        // 토큰에서 사용자 ID 추출
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({
                success: false,
                message: "로그인이 필요합니다."
            });
            return;
        }
        let reporterId;
        try {
            const decoded = (0, jwtUtil_1.verifyToken)(token);
            reporterId = decoded.userId;
        }
        catch (error) {
            res.status(403).json({
                success: false,
                message: "유효하지 않은 토큰입니다."
            });
            return;
        }
        if (!targetType || !targetId) {
            res.status(400).json({
                success: false,
                message: "필수 파라미터가 누락되었습니다."
            });
            return;
        }
        const hasReported = await (0, reportService_1.checkUserReported)(targetType, parseInt(targetId), reporterId);
        res.status(200).json({
            success: true,
            hasReported
        });
    }
    catch (error) {
        console.error("checkUserReportedController error:", error);
        res.status(500).json({
            success: false,
            message: "서버 오류가 발생했습니다."
        });
    }
};
exports.checkUserReportedController = checkUserReportedController;
// 자유게시판 신고 관련 컨트롤러 함수들
const createFreeBoardReport = async (req, res) => {
    try {
        const { target_type, target_id, report_reason } = req.body;
        // 토큰에서 사용자 ID 추출
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ success: false, message: '인증 토큰이 필요합니다.' });
            return;
        }
        const token = authHeader.substring(7);
        let reporterId;
        try {
            const decoded = (0, jwtUtil_1.verifyToken)(token);
            reporterId = decoded.userId;
        }
        catch (error) {
            res.status(403).json({
                success: false,
                message: "유효하지 않은 토큰입니다."
            });
            return;
        }
        // 입력값 검증
        if (!target_type || !target_id || !report_reason) {
            res.status(400).json({ success: false, message: '필수 정보가 누락되었습니다.' });
            return;
        }
        if (!['post', 'comment'].includes(target_type)) {
            res.status(400).json({ success: false, message: '잘못된 신고 대상 타입입니다.' });
            return;
        }
        if (!['욕설', '광고', '도배', '부적절한 사진', '기타'].includes(report_reason)) {
            res.status(400).json({ success: false, message: '잘못된 신고 사유입니다.' });
            return;
        }
        const result = await (0, reportService_1.createFreeBoardReport)(target_type, target_id, reporterId, report_reason);
        if (result.success) {
            res.status(201).json(result);
        }
        else {
            res.status(400).json(result);
        }
    }
    catch (error) {
        console.error('자유게시판 신고 컨트롤러 오류:', error);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
};
exports.createFreeBoardReport = createFreeBoardReport;
// 관리자용 신고 목록 조회 컨트롤러들
const getAllReportsController = async (req, res) => {
    try {
        const reports = await (0, reportService_1.getAllReports)();
        res.json({
            success: true,
            reports
        });
    }
    catch (error) {
        console.error('모든 신고 목록 조회 컨트롤러 오류:', error);
        res.status(500).json({
            success: false,
            message: '신고 목록을 불러오는데 실패했습니다.'
        });
    }
};
exports.getAllReportsController = getAllReportsController;
const getDripReportsController = async (req, res) => {
    try {
        const reports = await (0, reportService_1.getDripReports)();
        res.json({
            success: true,
            reports
        });
    }
    catch (error) {
        console.error('Drip 신고 목록 조회 컨트롤러 오류:', error);
        res.status(500).json({
            success: false,
            message: 'Drip 신고 목록을 불러오는데 실패했습니다.'
        });
    }
};
exports.getDripReportsController = getDripReportsController;
const getFreeBoardReportsController = async (req, res) => {
    try {
        const reports = await (0, reportService_1.getFreeBoardReports)();
        res.json({
            success: true,
            reports
        });
    }
    catch (error) {
        console.error('자유게시판 신고 목록 조회 컨트롤러 오류:', error);
        res.status(500).json({
            success: false,
            message: '자유게시판 신고 목록을 불러오는데 실패했습니다.'
        });
    }
};
exports.getFreeBoardReportsController = getFreeBoardReportsController;
// 신고 처리 컨트롤러
const processReportController = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { action, boardType } = req.body;
        if (!action || !boardType) {
            res.status(400).json({
                success: false,
                message: '필수 파라미터가 누락되었습니다.'
            });
            return;
        }
        const result = await (0, reportService_1.processReport)(parseInt(reportId), action, boardType);
        res.json(result);
    }
    catch (error) {
        console.error('신고 처리 컨트롤러 오류:', error);
        res.status(500).json({
            success: false,
            message: '신고 처리 중 오류가 발생했습니다.'
        });
    }
};
exports.processReportController = processReportController;
// 신고된 게시글/댓글 상세 정보 조회 컨트롤러
const getReportedContentController = async (req, res) => {
    try {
        const { targetId, targetType, boardType } = req.query;
        if (!targetId || !targetType || !boardType) {
            res.status(400).json({
                success: false,
                message: '필수 파라미터가 누락되었습니다.'
            });
            return;
        }
        const content = await (0, reportService_1.getReportedContent)(parseInt(targetId), targetType, boardType);
        res.json({
            success: true,
            content
        });
    }
    catch (error) {
        console.error('신고된 내용 조회 컨트롤러 오류:', error);
        res.status(500).json({
            success: false,
            message: '신고된 내용을 불러오는데 실패했습니다.'
        });
    }
};
exports.getReportedContentController = getReportedContentController;
