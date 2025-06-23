export interface Comment {
  id: string;
  content: string;
  username: string;
  timestamp: string;
  userId: string;
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
