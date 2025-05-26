export interface User {
  id: number;
  email: string;
  nickname: string;
  profile_image: string;
}

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  post_id: number;
  parent_id: number | null;
  user?: {
    nickname: string;
    profile_image: string;
  };
}

export interface DripPostCommentProps {
  postno: number;
  comments: Comment[];
  isLoading: boolean;
  commentContent: string;
  onCommentContentChange: (content: string) => void;
  onCommentSubmit: (e: React.FormEvent) => void;
  replyContents: { [key: number]: string };
  onReplyContentChange: (commentId: number, content: string) => void;
  onReplySubmit: (e: React.FormEvent, commentId: number) => void;
  showReplies: { [key: number]: boolean };
  onShowReplies: (commentId: number) => void;
  replies: { [key: number]: Comment[] };
}

export interface CommentFormProps {
  postId: number;
  parentId?: number;
  content: string;
  onContentChange: (content: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDisabled: boolean;
}

export interface CommentListProps {
  comments: Comment[];
  onCommentAdded: () => void;
}

export interface CommentItemProps {
  comment: Comment;
  replies: Comment[];
  showReplies: boolean;
  onShowReplies: () => void;
  onAddReply: (content: string) => void;
  replyContent: string;
  onReplyContentChange: (content: string) => void;
}

export type fetchDripComment = (postNo: number, parentId?: number) => Promise<Comment[]>;

export interface DripPostCommentPresenterProps {
  fetchDripComment: fetchDripComment[];
  formattedComments: string[];
  onChangePostComment: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDownPostComment: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
