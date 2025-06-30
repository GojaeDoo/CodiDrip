import { Request, Response } from "express";
import { createReport, getReportCount, checkUserReported, createFreeBoardReport as createFreeBoardReportService, getAllReports, getDripReports, getFreeBoardReports, processReport, getReportedContent } from "../service/reportService";
import { CreateReportData, ReportTargetType } from "../types/reportTypes";
import { verifyToken } from "../utils/jwtUtil";

export const createReportController = async (req: Request, res: Response): Promise<void> => {
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

    let reporterId: string;
    try {
      const decoded = verifyToken(token);
      reporterId = decoded.userId;
    } catch (error) {
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

    const reportData: CreateReportData = {
      targetType,
      targetId,
      reporterId,
      reportReason
    };

    const result = await createReport(reportData);

    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error("createReportController error:", error);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다."
    });
  }
};

export const getReportCountController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { targetType, targetId } = req.query;

    if (!targetType || !targetId) {
      res.status(400).json({
        success: false,
        message: "필수 파라미터가 누락되었습니다."
      });
      return;
    }

    const count = await getReportCount(
      targetType as ReportTargetType, 
      parseInt(targetId as string)
    );

    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    console.error("getReportCountController error:", error);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다."
    });
  }
};

export const checkUserReportedController = async (req: Request, res: Response): Promise<void> => {
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

    let reporterId: string;
    try {
      const decoded = verifyToken(token);
      reporterId = decoded.userId;
    } catch (error) {
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

    const hasReported = await checkUserReported(
      targetType as ReportTargetType,
      parseInt(targetId as string),
      reporterId
    );

    res.status(200).json({
      success: true,
      hasReported
    });
  } catch (error) {
    console.error("checkUserReportedController error:", error);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다."
    });
  }
};

// 자유게시판 신고 관련 컨트롤러 함수들
export const createFreeBoardReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { target_type, target_id, report_reason } = req.body;
    
    // 토큰에서 사용자 ID 추출
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: '인증 토큰이 필요합니다.' });
      return;
    }
    
    const token = authHeader.substring(7);
    let reporterId: string;
    try {
      const decoded = verifyToken(token);
      reporterId = decoded.userId;
    } catch (error) {
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
    
    const result = await createFreeBoardReportService(target_type, target_id, reporterId, report_reason);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('자유게시판 신고 컨트롤러 오류:', error);
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
};

// 관리자용 신고 목록 조회 컨트롤러들
export const getAllReportsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const reports = await getAllReports();
    res.json({
      success: true,
      reports
    });
  } catch (error) {
    console.error('모든 신고 목록 조회 컨트롤러 오류:', error);
    res.status(500).json({
      success: false,
      message: '신고 목록을 불러오는데 실패했습니다.'
    });
  }
};

export const getDripReportsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const reports = await getDripReports();
    res.json({
      success: true,
      reports
    });
  } catch (error) {
    console.error('Drip 신고 목록 조회 컨트롤러 오류:', error);
    res.status(500).json({
      success: false,
      message: 'Drip 신고 목록을 불러오는데 실패했습니다.'
    });
  }
};

export const getFreeBoardReportsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const reports = await getFreeBoardReports();
    res.json({
      success: true,
      reports
    });
  } catch (error) {
    console.error('자유게시판 신고 목록 조회 컨트롤러 오류:', error);
    res.status(500).json({
      success: false,
      message: '자유게시판 신고 목록을 불러오는데 실패했습니다.'
    });
  }
};

// 신고 처리 컨트롤러
export const processReportController = async (req: Request, res: Response): Promise<void> => {
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

    const result = await processReport(parseInt(reportId), action, boardType);
    res.json(result);
  } catch (error) {
    console.error('신고 처리 컨트롤러 오류:', error);
    res.status(500).json({
      success: false,
      message: '신고 처리 중 오류가 발생했습니다.'
    });
  }
};

// 신고된 게시글/댓글 상세 정보 조회 컨트롤러
export const getReportedContentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { targetId, targetType, boardType } = req.query;

    if (!targetId || !targetType || !boardType) {
      res.status(400).json({
        success: false,
        message: '필수 파라미터가 누락되었습니다.'
      });
      return;
    }

    const content = await getReportedContent(
      parseInt(targetId as string),
      targetType as 'post' | 'comment',
      boardType as 'drip' | 'freeboard'
    );

    res.json({
      success: true,
      content
    });
  } catch (error) {
    console.error('신고된 내용 조회 컨트롤러 오류:', error);
    res.status(500).json({
      success: false,
      message: '신고된 내용을 불러오는데 실패했습니다.'
    });
  }
}; 