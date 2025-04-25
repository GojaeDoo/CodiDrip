import { KeyboardEvent } from "react";

export interface PasswordResetProps {
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onClickResetPassword: () => void;
  error: string;
}
