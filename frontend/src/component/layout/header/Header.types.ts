export interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickMoveLogin: () => void;
  onClickMoveJoin: () => void;
  onClickLogout?: () => void;
  isLoggedIn: boolean;
}
