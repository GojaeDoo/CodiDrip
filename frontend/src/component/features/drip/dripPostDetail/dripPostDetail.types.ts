import { RefObject, SyntheticEvent } from "react";

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
  is_liked: boolean;
}

export interface DripPostDetailProps {
  postno: string;
}

export interface DripPostDetailPresenterProps {
  containerRef: React.RefObject<HTMLDivElement>;
  imageRef: React.RefObject<HTMLImageElement>;
  aspectRatio: string;
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  dripPost: any;
  images: string[];
  currentImageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  getImageUrl: (imagePath: string) => string;
  postTags: string[];
  postno: string;
  isLiked: boolean;
  onLikeClick: () => void;
  onCommentClick: () => void;
  newComment: string;
  setNewComment: (content: string) => void;
  onCommentSubmit: () => void;
}
