export interface DripPostCommentProps {
  postno: number;
}

export interface fetchDripComment {
  닉네임: string;
  댓글내용: string;
  작성시간: string;
  프로필이미지: string;
}

export interface DripPostCommentPresenterProps {
  fetchDripComment: fetchDripComment[];
  formattedComments: string[];
  onChangePostComment: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDownPostComment: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
