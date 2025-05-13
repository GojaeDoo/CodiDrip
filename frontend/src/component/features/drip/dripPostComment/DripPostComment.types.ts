export interface DripPostCommentProps {
  postno: number;
}

export interface Comment {
  닉네임: string;
  댓글내용: string;
  작성시간: string;
  프로필이미지: string;
}

export interface DripPostCommentPresenterProps {
  comments: Comment[];
  formattedComments: string[];
}
