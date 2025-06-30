export interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickMoveLogin: () => void;
  onClickMoveJoin: () => void;
  onClickMain: () => void;
  onClickMoveMyPage: () => void;
  onClickMoveDripUser: () => void;
  onClickMoveDrips: () => void;
  onClickMoveFreeBoardList: () => void;
  onClickMoveReportList: () => void;
  isLoggedIn: boolean;
  userProfile: Profile | null;
  isAdmin: boolean;
  onChangeSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterSearchInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onToggleTheme: () => void;
  theme: "light" | "dark";
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
