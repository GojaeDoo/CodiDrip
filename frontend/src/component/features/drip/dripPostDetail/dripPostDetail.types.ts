export interface Comment {
  profile_image: string;
  profile_nickname: string;
  comment_content: string;
}

export interface Pin {
  id: number;
  x: number;
  y: number;
  description: string;
}

export interface DripPostDetailResponse {
  post_no: number;
  user_id: string;
  닉네임: string;
  프로필이미지: string;
  키?: number;
  몸무게?: number;
  게시글이미지: string;
  태그: string;
  작성일시: string;
  핀: Pin[];
}

export interface DripPostDetailProps {
  dripPost: DripPostDetailResponse;
  images: string[];
  currentImageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  getImageUrl: (imagePath: string) => string;
  postTags: string[];
  pins: Pin[];
  postno: number;
}

export interface DripPostDetailPresenterProps {
  post: {
    post_no: number;
    user_id: string;
    nickname: string;
    게시글이미지: string;
    태그: string;
    작성일시: string;
    pins: Pin[];
  };
  currentImageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  onPinClick: (pin: Pin) => void;
  selectedPin: Pin | null;
}
