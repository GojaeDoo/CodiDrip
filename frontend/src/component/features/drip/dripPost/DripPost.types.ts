export interface DripPostType {
  post_no: number;
  post_image: string[];
  post_tag: string[];
  user_id: string;
  profile_image: string;
  profile_nickname: string;
}

export interface DripPostProps {
  isMyPage?: boolean;
  userId?: string;
  dripPostData: Array<{
    post_no: number;
    user_id: string;
    profile_image: string;
    profile_nickname: string;
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

export interface DripPostContainerProps extends DripPostProps {}

export interface DripPostPresenterProps {
  dripPostData: DripPostType[] | null;
  currentImageIndexes: {
    [key: number]: number;
  };
  onPrevImage: (postNo: number, imageCount: number) => void;
  onNextImage: (postNo: number, imageCount: number) => void;
}
