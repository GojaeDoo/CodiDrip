import { ReactNode } from "react";

export interface Profile {
  profile_id: number;
  profile_nickname: string;
  profile_height: number;
  profile_weight: number;
  profile_image: string | null;
  profile_gender: string;
  profile_follow: number;
  user_id: string;
  profile_about: string | null;
}

export interface MyPagePresenterProps {
  userProfile: {
    profile_id: string;
    profile_nickname: string;
    profile_image: string | null;
    user_id: string;
    profile_about: string;
    profile_height: number;
    profile_weight: number;
    profile_gender: string;
    profile_follow: number;
    post_count: number;
  } | null;
  isMyPage: boolean;
  isOwnProfile: boolean;
  isFollowing: boolean;
  isMyDrip: boolean;
  isLike: boolean;
  isSaved: boolean;
  isFollower: boolean;
  isFollowingTab: boolean;
  isMyPost: boolean;
  activeFollowTab: 'followers' | 'following';
  freeBoardPosts: FreeBoardPost[];
  formatDate: (dateString: string) => string;
  onClickMoveProfileEdit: () => void;
  onClickFollow: () => void;
  onClickMoveDripPostEdit: () => void;
  onClickMoveMyDrip: () => void;
  onClickMoveLikedDrip: () => void;
  onClickMoveSavedDrip: () => void;
  onClickMoveFollower: () => void;
  onClickMoveFollowing: () => void;
  onClickMoveMyPost: () => void;
  onClickFreeBoardPost: (postId: number) => void;
  onClickLogout: () => void;
  isFollowLoading: boolean;
  isFreeBoardLoading: boolean;
  isMyPageLoading: boolean;
  children?: ReactNode;
}

export interface FreeBoardPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  viewCount: number;
}
