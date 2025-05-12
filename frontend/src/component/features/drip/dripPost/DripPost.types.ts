export interface DripPostResponse {
  게시글번호: number;
  게시글이미지: string;
  태그: string;
  user_id: string;
  프로필이미지: string;
  닉네임: string;
  키: number;
  몸무게: number;
}

export interface DripPostType {
  post_no: number;
  post_image: string[];
  post_tag: string[];
  user_id: string;
  profile_image: string;
  profile_nickname: string;
  profile_height: number;
  profile_weight: number;
}

export interface DripPostProps {
  isMyPage?: boolean;
  userId?: string;
  dripPostData: Array<{
    post_no: number;
    user_id: string;
    profile_image: string;
    profile_nickname: string;
    profile_height: number;
    profile_weight: number;
    post_image: string[];
    post_tag: string[];
  }>;
  currentImageIndexes: Record<number, number>;
  currentUserId: string;
  onHidePost: (postNo: number) => void;
  onEditPost: (postNo: number) => void;
  onDeletePost: (postNo: number) => void;
  onClickMoveDetail: (postNo: number) => void;
  onPrevImage: (postNo: number, totalImages: number) => void;
  onNextImage: (postNo: number, totalImages: number) => void;
  onMenuClick?: (postNo: number) => void;
  activeMenu?: number | null;
}

export interface DripPostPresenterProps {
  dripPostData: DripPostType[] | null;
  currentImageIndexes: {
    [key: number]: number;
  };
  onPrevImage: (postNo: number, imageCount: number) => void;
  onNextImage: (postNo: number, imageCount: number) => void;
}
