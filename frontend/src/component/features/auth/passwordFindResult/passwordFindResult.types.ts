import { ChangeEvent, KeyboardEvent } from "react";

export interface PasswordFindResultPresenterProps {
  onChangeAuthenticationNumber: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onClickSend: () => void;
  error: string;
}
