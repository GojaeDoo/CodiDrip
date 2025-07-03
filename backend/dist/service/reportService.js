"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportedContent = exports.processReport = exports.getFreeBoardReports = exports.getDripReports = exports.getAllReports = exports.createFreeBoardReport = exports.checkUserReported = exports.getReportCount = exports.createReport = void 0;
const reportStorage_1 = require("../storage/reportStorage");
const createReport = async (data) => {
    try {
        // 입력 데이터 검증
        if (!data.targetType || !data.targetId || !data.reporterId || !data.reportReason) {
            throw new Error("필수 입력 항목이 누락되었습니다.");
        }
        // 이미 신고했는지 확인
        const hasReported = await (0, reportStorage_1.hasUserReportedDB)(data.targetType, data.targetId, data.reporterId);
        if (hasReported) {
            return {
                success: false,
                message: "이미 신고한 게시물입니다."
            };
        }
        // 신고 생성
        const result = await (0, reportStorage_1.createReportDB)(data);
        return {
            success: true,
            message: result.message
        };
    }
    catch (error) {
        console.error("createReport service error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "신고 처리 중 오류가 발생했습니다."
        };
    }
};
exports.createReport = createReport;
const getReportCount = async (targetType, targetId) => {
    try {
        return await (0, reportStorage_1.getReportCountDB)(targetType, targetId);
    }
    catch (error) {
        console.error("getReportCount service error:", error);
        throw error;
    }
};
exports.getReportCount = getReportCount;
const checkUserReported = async (targetType, targetId, reporterId) => {
    try {
        return await (0, reportStorage_1.hasUserReportedDB)(targetType, targetId, reporterId);
    }
    catch (error) {
        console.error("checkUserReported service error:", error);
        throw error;
    }
};
exports.checkUserReported = checkUserReported;
// 자유게시판 신고 관련 서비스 함수들
const createFreeBoardReport = async (targetType, targetId, reporterId, reportReason) => {
    try {
        // 이미 신고했는지 확인
        const alreadyReported = await (0, reportStorage_1.checkFreeBoardReportExists)(targetType, targetId, reporterId);
        if (alreadyReported) {
            return {
                success: false,
                message: '이미 신고한 게시글/댓글입니다.'
            };
        }
        // 신고 생성
        await (0, reportStorage_1.createFreeBoardReportStorage)(targetType, targetId, reporterId, reportReason);
        return {
            success: true,
            message: '신고가 성공적으로 접수되었습니다.'
        };
    }
    catch (error) {
        console.error('자유게시판 신고 생성 오류:', error);
        return {
            success: false,
            message: '신고 처리 중 오류가 발생했습니다.'
        };
    }
};
exports.createFreeBoardReport = createFreeBoardReport;
// 관리자용 신고 목록 조회 함수들
const getAllReports = async () => {
    try {
        const [dripReports, freeBoardReports] = await Promise.all([
            (0, reportStorage_1.getDripReportsDB)(),
            (0, reportStorage_1.getFreeBoardReportsDB)()
        ]);
        // Drip 신고에 board_type 추가
        const dripReportsWithType = dripReports.map(report => ({
            ...report,
            board_type: 'drip'
        }));
        // 자유게시판 신고에 board_type 추가
        const freeBoardReportsWithType = freeBoardReports.map(report => ({
            ...report,
            board_type: 'freeboard'
        }));
        // 날짜순으로 정렬 (최신순)
        const allReports = [...dripReportsWithType, ...freeBoardReportsWithType]
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        return allReports;
    }
    catch (error) {
        console.error('모든 신고 목록 조회 오류:', error);
        throw error;
    }
};
exports.getAllReports = getAllReports;
const getDripReports = async () => {
    try {
        const reports = await (0, reportStorage_1.getDripReportsDB)();
        return reports.map(report => ({
            ...report,
            board_type: 'drip'
        }));
    }
    catch (error) {
        console.error('Drip 신고 목록 조회 오류:', error);
        throw error;
    }
};
exports.getDripReports = getDripReports;
const getFreeBoardReports = async () => {
    try {
        const reports = await (0, reportStorage_1.getFreeBoardReportsDB)();
        return reports.map(report => ({
            ...report,
            board_type: 'freeboard'
        }));
    }
    catch (error) {
        console.error('자유게시판 신고 목록 조회 오류:', error);
        throw error;
    }
};
exports.getFreeBoardReports = getFreeBoardReports;
// 신고 처리 (삭제 또는 무시)
const processReport = async (reportId, action, boardType) => {
    try {
        const result = await (0, reportStorage_1.processReportDB)(reportId, action, boardType);
        return {
            success: true,
            message: result.message
        };
    }
    catch (error) {
        console.error('신고 처리 오류:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : '신고 처리 중 오류가 발생했습니다.'
        };
    }
};
exports.processReport = processReport;
// 신고된 게시글/댓글 상세 정보 조회
const getReportedContent = async (targetId, targetType, boardType) => {
    try {
        // 이 함수는 나중에 구현할 수 있습니다
        // 현재는 기본 정보만 반환
        return {
            targetId,
            targetType,
            boardType,
            content: '신고된 내용을 불러올 수 없습니다.'
        };
    }
    catch (error) {
        console.error('신고된 내용 조회 오류:', error);
        throw error;
    }
};
exports.getReportedContent = getReportedContent;
