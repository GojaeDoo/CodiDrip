export interface PasswordResetProps {
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickResetPassword: () => void;
  error: string;
}
