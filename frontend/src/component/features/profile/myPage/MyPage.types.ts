import { ReactNode } from "react";

export interface MyPageProps {
  userProfile?: {
    user_id: string;
    profile_id: number;
    profile_nickname: string;
    profile_height: number;
    profile_weight: number;
    profile_image: string | null;
    profile_gender: string;
    profile_follow: number;
    profile_about: string | null;
    post_count: number;
  } | null;
  isMyDrip?: boolean;
  isLike?: boolean;
  isSaved?: boolean;
  isFollower?: boolean;
  isFollowing?: boolean;
  onClickMoveProfileEdit?: () => void;
  onClickMoveDripPostEdit?: () => void;
  onClickMoveMyDrip?: () => void;
  onClickMoveLikedDrip?: () => void;
  onClickMoveSavedDrip?: () => void;
  onClickMoveFollower?: () => void;
  onClickMoveFollowing?: () => void;
  children?: ReactNode;
}
