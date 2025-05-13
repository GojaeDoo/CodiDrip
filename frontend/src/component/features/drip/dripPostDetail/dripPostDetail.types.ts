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
  키: number;
  몸무게: number;
  comments?: {
    profile_image: string;
    profile_nickname: string;
    comment_content: string;
  }[];
}

export interface DripPostDetailProps {
  dripPost?: {
    프로필이미지: string;
    닉네임: string;
    키: number;
    몸무게: number;
  };
  postImages: string[];
  postTags: string[];
  currentImageIndex: number;
  onPrevImage: (totalImages: number) => void;
  onNextImage: (totalImages: number) => void;
  postno: string;
}
