import { Profile } from "@/types/profile";

export interface LoginPresenterProps {
  onClickMoveJoin: () => void;
  onClickMoveIdFind: () => void;
  onClickMovePasswordFind: () => void;
  onChangeUserId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUserPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClickLogin: () => void;
  profiles: Profile[];
}

