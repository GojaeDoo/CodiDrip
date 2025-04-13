import { Profile } from "@/types/profile";
export interface LoginProps {
  onClickMoveJoin: () => void;
  onChangeUserId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUserPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickLogin: () => void;
  profiles: Profile[];
}

export interface LoginResponse {
  message: string;
  user: {
    user_id: string;
    user_email: string;
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
