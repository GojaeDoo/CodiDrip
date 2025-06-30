import { 
  createReportDB, 
  getReportCountDB, 
  hasUserReportedDB,
  createFreeBoardReportStorage,
  checkFreeBoardReportExists,
  getAllReportsDB,
  getDripReportsDB,
  getFreeBoardReportsDB,
  processReportDB
} from "../storage/reportStorage";
import { CreateReportData, ReportTargetType, ReportResponse } from "../types/reportTypes";

export const createReport = async (data: CreateReportData): Promise<ReportResponse> => {
  try {
    // 입력 데이터 검증
    if (!data.targetType || !data.targetId || !data.reporterId || !data.reportReason) {
      throw new Error("필수 입력 항목이 누락되었습니다.");
    }

    // 이미 신고했는지 확인
    const hasReported = await hasUserReportedDB(data.targetType, data.targetId, data.reporterId);
    if (hasReported) {
      return {
        success: false,
        message: "이미 신고한 게시물입니다."
      };
    }

    // 신고 생성
    const result = await createReportDB(data);
    
    return {
      success: true,
      message: result.message
    };
  } catch (error) {
    console.error("createReport service error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "신고 처리 중 오류가 발생했습니다."
    };
  }
};

export const getReportCount = async (targetType: ReportTargetType, targetId: number): Promise<number> => {
  try {
    return await getReportCountDB(targetType, targetId);
  } catch (error) {
    console.error("getReportCount service error:", error);
    throw error;
  }
};

export const checkUserReported = async (
  targetType: ReportTargetType, 
  targetId: number, 
  reporterId: string
): Promise<boolean> => {
  try {
    return await hasUserReportedDB(targetType, targetId, reporterId);
  } catch (error) {
    console.error("checkUserReported service error:", error);
    throw error;
  }
};

// 자유게시판 신고 관련 서비스 함수들
export const createFreeBoardReport = async (
  targetType: 'post' | 'comment',
  targetId: number,
  reporterId: string,
  reportReason: '욕설' | '광고' | '도배' | '부적절한 사진' | '기타'
): Promise<{ success: boolean; message: string }> => {
  try {
    // 이미 신고했는지 확인
    const alreadyReported = await checkFreeBoardReportExists(targetType, targetId, reporterId);
    
    if (alreadyReported) {
      return {
        success: false,
        message: '이미 신고한 게시글/댓글입니다.'
      };
    }
    
    // 신고 생성
    await createFreeBoardReportStorage(targetType, targetId, reporterId, reportReason);
    
    return {
      success: true,
      message: '신고가 성공적으로 접수되었습니다.'
    };
  } catch (error) {
    console.error('자유게시판 신고 생성 오류:', error);
    return {
      success: false,
      message: '신고 처리 중 오류가 발생했습니다.'
    };
  }
};

// 관리자용 신고 목록 조회 함수들
export const getAllReports = async () => {
  try {
    const [dripReports, freeBoardReports] = await Promise.all([
      getDripReportsDB(),
      getFreeBoardReportsDB()
    ]);

    // Drip 신고에 board_type 추가
    const dripReportsWithType = dripReports.map(report => ({
      ...report,
      board_type: 'drip' as const
    }));

    // 자유게시판 신고에 board_type 추가
    const freeBoardReportsWithType = freeBoardReports.map(report => ({
      ...report,
      board_type: 'freeboard' as const
    }));

    // 날짜순으로 정렬 (최신순)
    const allReports = [...dripReportsWithType, ...freeBoardReportsWithType]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return allReports;
  } catch (error) {
    console.error('모든 신고 목록 조회 오류:', error);
    throw error;
  }
};

export const getDripReports = async () => {
  try {
    const reports = await getDripReportsDB();
    return reports.map(report => ({
      ...report,
      board_type: 'drip' as const
    }));
  } catch (error) {
    console.error('Drip 신고 목록 조회 오류:', error);
    throw error;
  }
};

export const getFreeBoardReports = async () => {
  try {
    const reports = await getFreeBoardReportsDB();
    return reports.map(report => ({
      ...report,
      board_type: 'freeboard' as const
    }));
  } catch (error) {
    console.error('자유게시판 신고 목록 조회 오류:', error);
    throw error;
  }
};

// 신고 처리 (삭제 또는 무시)
export const processReport = async (
  reportId: number,
  action: 'delete' | 'ignore',
  boardType: 'drip' | 'freeboard'
): Promise<{ success: boolean; message: string }> => {
  try {
    const result = await processReportDB(reportId, action, boardType);
    return {
      success: true,
      message: result.message
    };
  } catch (error) {
    console.error('신고 처리 오류:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '신고 처리 중 오류가 발생했습니다.'
    };
  }
};

// 신고된 게시글/댓글 상세 정보 조회
export const getReportedContent = async (
  targetId: number,
  targetType: 'post' | 'comment',
  boardType: 'drip' | 'freeboard'
) => {
  try {
    // 이 함수는 나중에 구현할 수 있습니다
    // 현재는 기본 정보만 반환
    return {
      targetId,
      targetType,
      boardType,
      content: '신고된 내용을 불러올 수 없습니다.'
    };
  } catch (error) {
    console.error('신고된 내용 조회 오류:', error);
    throw error;
  }
}; 