export interface DripPostCommentProps {
  postno: number;
}

export interface DripPostCommentContainerProps {
  onChangeComment : (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitComment: () => void;
}