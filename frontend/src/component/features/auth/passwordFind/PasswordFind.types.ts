import { ChangeEvent, KeyboardEvent } from "react";

export interface PasswordFindPresenterProps {
  onChangeId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onClickFindPassword: () => void;
  error: string;
}
