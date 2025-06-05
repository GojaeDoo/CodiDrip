export interface MyPageProps {
  userId?: string;
  userProfile?: Profile | null;
  onClickMoveProfileEdit?: () => void;
  onClickMoveDripPostEdit?: () => void;
  onClickMoveMyDrip?: () => void;
  onClickMoveLikedDrip?: () => void;
  onClickMoveSavedDrip?: () => void;
}

export interface Profile {
  user_id: string;
  profile_id: number;
  profile_nickname: string;
  profile_height: number;
  profile_weight: number;
  profile_image: string | null;
  profile_gender: string;
  profile_follow: number;
  profile_about: string | null;
}
