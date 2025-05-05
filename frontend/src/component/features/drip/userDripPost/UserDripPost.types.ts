export interface DripPostType {
  id: number;
  post_image: string;
  post_tag: string;
  user_id: string;
}

export interface UserDripPostProps {
  dripPostData: DripPostType[] | null;
  currentImageIndexes: {
    [key: number]: number;
  };
  onPrevImage: (postId: number, imageCount: number) => void;
  onNextImage: (postId: number, imageCount: number) => void;
}
