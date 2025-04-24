import { ChangeEvent } from "react";

export interface PasswordFindResultProps {
  onChangeAuthenticationNumber: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onClickSend: () => void;
  error: string;
}
