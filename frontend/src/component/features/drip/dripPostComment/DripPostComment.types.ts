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
}

export interface DripPostCommentContainerProps {
  onChangeComment: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitComment: () => void;
  commentList: DripPostCommentFetchState[];
  onLikeComment?: (commentId: number) => void;
  myUserId?: string;
  activeMenuId?: number | null;
  handleMenuOpen?: (commentId: number) => void;
  onEditComment?: (commentId: number) => void;
  onEditCancel?: () => void;
  onEditSubmit?: () => void;
}