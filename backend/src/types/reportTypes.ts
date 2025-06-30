export type ReportTargetType = 'post' | 'comment';
export type ReportReasonType = 
  | '욕설'
  | '광고'
  | '도배'
  | '부적절한 사진'
  | '기타';

export interface CreateReportData {
  targetType: ReportTargetType;
  targetId: number;
  reporterId: string;
  reportReason: ReportReasonType;
}

export interface ReportResponse {
  success: boolean;
  message: string;
}

// 자유게시판 신고 관련 타입
export interface FreeBoardReport {
  report_id: number;
  target_type: 'post' | 'comment';
  target_id: number;
  reporter_id: string;
  report_reason: '욕설' | '광고' | '도배' | '부적절한 사진' | '기타';
  created_at: Date;
}

export interface CreateFreeBoardReportRequest {
  target_type: 'post' | 'comment';
  target_id: number;
  report_reason: '욕설' | '광고' | '도배' | '부적절한 사진' | '기타';
}

export interface CreateFreeBoardReportResponse {
  success: boolean;
  message: string;
} 