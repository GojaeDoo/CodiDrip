import { KeyboardEvent } from "react";

export interface PasswordResetPresenterProps {
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onClickResetPassword: () => void;
  error: string;
}
