export interface Comment {
  id: number;
  content: string;
  profile_image: string;
  profile_nickname: string;
  created_at: string;
  liked: boolean;
  like_count: number;
  parent_id?: string | null;
  replies?: Comment[];
  user_id: string;
}

export type ReportTargetType = 'post' | 'comment';
export type ReportReasonType = 
  | '욕설'
  | '광고'
  | '도배'
  | '부적절한 사진'
  | '기타';

export interface ReportData {
  targetType: ReportTargetType;
  targetId: number;
  reportReason: ReportReasonType;
}

export interface ReportResponse {
  success: boolean;
  message: string;
}

export interface DripPostCommentProps {
  commentList: Comment[];
  onLikeComment: (commentId: number) => void;
  onReplyClick: (commentId: number) => void;
  onCommentSubmit: () => void;
  newComment: string;
  setNewComment: (content: string) => void;
  expandedReplies: { [key: number]: boolean };
  toggleReplies: (commentId: number) => void;
  isModalOpen: boolean;
  onCloseModal: () => void;
  onOpenModal: () => void;
  activeMenuId: number | null;
  handleMenuOpen: (commentId: number) => void;
  onEditComment: (commentId: number) => void;
  onDeleteComment: (commentId: number) => void;
  editingCommentId: number | null;
  editContent: string;
  setEditContent: (content: string) => void;
  onEditSubmit: () => void;
  onEditCancel: () => void;
  myUserId: string;
  isAdmin: boolean;
  replyingToId: number | null;
  replyContent: string;
  onChangeReply: (value: string) => void;
  onSubmitReply: () => void;
  showReportModal: boolean;
  reportCommentId: number | null;
  onOpenReportModal: (commentId: number) => void;
  onCloseReportModal: () => void;
  onReportSubmit: (reason: ReportReasonType) => void;
}

export interface DripPostCommentFetchState {
  content: string;
  created_at: string;
  id: number;
  post_id: number;
  profile_image: string;
  profile_nickname: string;
  user_id: string;
  like_count?: number;
  liked?: boolean;
  parent_id?: string | null;
  replies?: DripPostCommentFetchState[];
}

export interface DripPostCommentContainerProps {
  postno: number;
}