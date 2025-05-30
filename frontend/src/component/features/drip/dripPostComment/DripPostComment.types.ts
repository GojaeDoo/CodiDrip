export interface DripPostCommentProps {
  postno: number;
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

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  post_id: number;
  parent_id: string | null;
  user_id: string;
  profile_nickname: string;
  profile_image: string;
  like_count: number;
  liked: boolean;
  replies?: Comment[];
}

export interface DripPostCommentContainerProps {
  commentList: Comment[];
  onChangeComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitComment: () => void;
  onLikeComment: (commentId: number) => void;
  handleMenuOpen: (commentId: number) => void;
  activeMenuId: number | null;
  onEditComment: (commentId: number) => void;
  onDeleteComment: (commentId: number) => void;
  editingCommentId: number | null;
  editContent: string;
  setEditContent: (content: string) => void;
  onEditSubmit: () => void;
  onEditCancel: () => void;
  replyingToId: number | null;
  onReplyClick: (commentId: number) => void;
  onChangeReply: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitReply: () => void;
  myUserId?: string;
  expandedReplies: { [key: number]: boolean };
  toggleReplies: (commentId: number) => void;
}