export interface Comment {
  profile_image: string;
  profile_nickname: string;
  comment_content: string;
}

export interface DripPostDetailResponse {
  게시글번호: number;
  게시글이미지: string;
  태그: string;
  user_id: string;
  프로필이미지: string;
  닉네임: string;
  comments?: {
    profile_image: string;
    profile_nickname: string;
    comment_content: string;
  }[];
}

export interface DripPostDetailProps {
  dripPost?: DripPostDetailResponse;
  postImages: string[];
  postTags: string[];
}
