

export interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickMoveLogin: () => void;
  onClickMoveJoin: () => void;
  onClickLogout: () => void;
  onClickMain: () => void;
  onClickMoveMyPage: () => void;
  onClickMoveDripUser: () => void;
  onClickMoveDrips: () => void;
  isLoggedIn: boolean;
  userProfile: Profile | null;
  onChangeSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterSearchInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface Profile {
  id: number;
  user_id: string;
  height: number;
  weight: number;
  gender: string;
  nickname: string;
  profile_image: string | null;
  profile_about: string | null;
  created_at: string;
  updated_at: string;
}
