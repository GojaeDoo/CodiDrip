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
  onDeletePost: (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => void;
  onPrevImage: (e: React.MouseEvent<HTMLButtonElement>, postNo: number, totalImages: number) => void;
  onNextImage: (e: React.MouseEvent<HTMLButtonElement>, postNo: number, totalImages: number) => void;
  onLikeClick: (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => void;
  onCommentClick: (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => void;
  onReportPost: (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => void;
  onPinClick: (e: React.MouseEvent<HTMLButtonElement>, postNo: number, pinId: number) => void;
  onPinHover: (e: React.MouseEvent<HTMLButtonElement>, postNo: number, pinId: number) => void;
  onPinLeave: (e: React.MouseEvent<HTMLButtonElement>, postNo: number, pinId: number) => void;
  onImageClick: (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => void;
  onCloseMenu: () => void;
  activePin: { postNo: number; pinId: number } | null;
  isLiked: boolean;
  isHidden: boolean;
  isPinned: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  isHiding: boolean;
  isReporting: boolean;
  isPinning: boolean;
  isUnpinning: boolean;
  isCommenting: boolean;
  isImageClicking: boolean;
  isMenuClicking: boolean;
  isPinClicking: boolean;
  isPinHovering: boolean;
  isPinLeaving: boolean;
  isPinActive: boolean;
  isPinInactive: boolean;
  isPinVisible: boolean;
  isPinHidden: boolean;
  isPinEnabled: boolean;
  isPinDisabled: boolean;
  isPinSelected: boolean;
  isPinUnselected: boolean;
  isPinFocused: boolean;
  isPinBlurred: boolean;
  isPinHovered: boolean;
  isPinUnhovered: boolean;
  isPinPressed: boolean;
  isPinReleased: boolean;
  isPinDragging: boolean;
  isPinDropped: boolean;
  isPinMoving: boolean;
  isPinStopped: boolean;
  isPinResizing: boolean;
  isPinResized: boolean;
  isPinRotating: boolean;
  isPinRotated: boolean;
  isPinScaling: boolean;
  isPinScaled: boolean;
  isPinTranslating: boolean;
  isPinTranslated: boolean;
  isPinAnimating: boolean;
  isPinAnimated: boolean;
  isPinTransitioning: boolean;
  isPinTransitioned: boolean;
  isPinLoading: boolean;
  isPinLoaded: boolean;
  isPinError: boolean;
  isPinSuccess: boolean;
  isPinWarning: boolean;
  isPinInfo: boolean;
  isPinDebug: boolean;
  isPinTrace: boolean;
  isPinVerbose: boolean;
  isPinSilent: boolean;
  isPinMuted: boolean;
  isPinUnmuted: boolean;
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
