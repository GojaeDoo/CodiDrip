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
