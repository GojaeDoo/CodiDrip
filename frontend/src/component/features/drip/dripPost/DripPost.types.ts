export interface DripPostAppProps {
  gender: string;
  isMyPage?: boolean;
}

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
  user_id: string;
  profile_image: string;
  profile_nickname: string;
  profile_height?: number;
  profile_weight?: number;
  post_image: string[];
  post_tag: string[];
  isOwner: boolean;
  currentImageIndex: number;
}

export interface DripPostProps {
  isMyPage?: boolean;
  userId?: string;
  dripPostData: DripPostType[];
  currentImageIndexes: { [key: number]: number };
  currentUserId: string;
  activeMenu: number | null;
  onClickMoveDetail?: (postNo: number) => void;
  onMenuClick: (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => void;
  onHidePost: (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => void;
  onEditPost: (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => void;
  onDeletePost: (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number
  ) => void;
  onPrevImage: (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number,
    totalImages: number
  ) => void;
  onNextImage: (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number,
    totalImages: number
  ) => void;
  onLikeClick: (e: React.MouseEvent<SVGSVGElement>, postNo: number) => void;
  onCommentClick: (e: React.MouseEvent<SVGSVGElement>, postNo: number) => void;
}

export interface DripPostContainerProps {
  gender: string;
  userId?: string;
  isMyPage?: boolean;
}

export interface DripPostPresenterProps {
  dripPostData: DripPostType[];
  currentImageIndexes: { [key: number]: number };
  currentUserId: string;
  activeMenu: number | null;
  onPrevImage: (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number,
    totalImages: number
  ) => void;
  onNextImage: (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number,
    totalImages: number
  ) => void;
  onHidePost: (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => void;
  onEditPost: (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => void;
  onDeletePost: (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number
  ) => void;
  onMenuClick: (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => void;
  onClickMoveDetail: (postNo: number) => void;
}
