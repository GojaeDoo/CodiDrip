export interface Comment {
  id: string;
  post_id: string;
  created_at: string;
  profile_nickname: string;
  user_id: string;
  profile_image: string;
  content: string;
  parent_id: string;
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
  formatTimestamp: (timestamp: string) => string;
  getInitials: (username: string) => string;
  hasMoreComments: boolean;
  showAllComments: boolean;
}
