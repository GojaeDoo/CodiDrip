export interface Comment {
  id: string;
  post_id: string;
  created_at: string;
  profile_nickname: string;
  user_id: string;
  profile_image: string;
  content: string;
  parent_id: string;
  reply_count?: number;
}

export interface CommentFormData {
  content: string;
}

export interface FreeBoardCommentProps {
  comments?: Comment[];
  isLoading?: boolean;
  onSubmitComment?: () => void;
  onDeleteComment?: (commentId: string) => void;
  onEditComment?: (comment: Comment) => void;
}

export interface FreeBoardCommentPresenterProps extends FreeBoardCommentProps {
  isModalOpen: boolean;
  newComment: string;
  editingCommentId: string | null;
  editContent: string;
  replyingToCommentId: string | null;
  replyContent: string;
  showingRepliesFor: string | null;
  replies: { [commentId: string]: Comment[] };
  onOpenModal: () => void;
  onCloseModal: () => void;
  onNewCommentChange: (value: string) => void;
  onSubmitComment: () => void;
  onEditComment: (comment: Comment) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditContentChange: (value: string) => void;
  onDeleteComment: (commentId: string) => void;
  onShowMoreComments: () => void;
  onShowLessComments: () => void;
  onReplyComment: (commentId: string) => void;
  onCancelReply: () => void;
  onReplyContentChange: (value: string) => void;
  onSubmitReply: () => void;
  onShowReplies: (commentId: string) => void;
  onHideReplies: (commentId: string) => void;
  formatTimestamp: (timestamp: string) => string;
  getInitials: (username: string) => string;
  hasMoreComments: boolean;
  showAllComments: boolean;
  isLogin: boolean;
  isCommentAuthor: (commentUserId: string) => boolean;
}
