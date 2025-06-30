export interface ReportItem {
  report_id: number;
  target_type: 'post' | 'comment';
  target_id: number;
  reporter_id: string;
  report_reason: '욕설' | '광고' | '도배' | '부적절한 사진' | '기타';
  created_at: string;
  // 추가 정보
  target_content?: string;
  target_author?: string;
  reporter_nickname?: string;
  post_id?: number; // 해당 게시글의 ID (댓글 신고 시 사용)
}

export interface DripReport extends ReportItem {
  board_type: 'drip';
}

export interface FreeBoardReport extends ReportItem {
  board_type: 'freeboard';
}

export type AllReport = DripReport | FreeBoardReport;

export interface ReportListState {
  reports: AllReport[];
  loading: boolean;
  error: string | null;
  selectedTab: 'all' | 'drip' | 'freeboard';
  selectedType: 'all' | 'post' | 'comment';
}

export interface TabCounts {
  all: number;
  drip: number;
  freeboard: number;
}

export interface ReportListPresenterProps {
  reports: AllReport[];
  loading: boolean;
  error: string | null;
  selectedTab: 'all' | 'drip' | 'freeboard';
  selectedType: 'all' | 'post' | 'comment';
  tabCounts: TabCounts;
  onTabChange: (tab: 'all' | 'drip' | 'freeboard') => void;
  onTypeChange: (type: 'all' | 'post' | 'comment') => void;
  onProcessReport: (reportId: number, action: 'delete' | 'ignore', boardType: 'drip' | 'freeboard') => void;
  onContentClick: (report: AllReport) => void;
  onRefresh: () => void;
}

export interface ReportListProps {
  // 필요한 props가 있다면 여기에 추가
}
