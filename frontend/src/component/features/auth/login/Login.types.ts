import { Profile } from "@/types/profile";
export interface LoginProps {
  onClickMoveJoin: () => void;
  onClickMoveIdFind: () => void;
  onClickMovePasswordFind: () => void;
  onChangeUserId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUserPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClickLogin: () => void;
  profiles: Profile[];
}

export interface LoginResponse {
  message: string;
  user: {
    user_id: string;
    user_email: string;
    is_admin?: boolean;
  };
  token: string;
}

export interface LoginError {
  response?: {
    data?: {
      error: string;
    };
  };
  message: string;
}
