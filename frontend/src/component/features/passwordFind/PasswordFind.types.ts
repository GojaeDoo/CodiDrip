import { ChangeEvent } from "react";

export interface PasswordFindProps {
  onChangeId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickFindPassword: () => void;
  error: string;
}
