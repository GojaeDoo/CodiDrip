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
  replyingToId: number | null;
  replyContent: string;
  onChangeReply: (value: string) => void;
  onSubmitReply: () => void;
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