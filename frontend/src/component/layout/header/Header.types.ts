import { Profile } from "@/types/profile";

export interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickMoveLogin: () => void;
  onClickMoveJoin: () => void;
  onClickLogout: () => void;
  onClickMain: () => void;
  onClickMoveMyPage: () => void;
  onClickMoveDripUser: () => void;
  isLoggedIn: boolean;
  userProfile: Profile | null;
}
