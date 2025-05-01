import { Profile } from "@/types/profile";

export interface MyPageProps {
  userProfile: Profile | null;
  onClickMoveProfileEdit: () => void;
  onClickMoveDripPostEdit: () => void;
}
