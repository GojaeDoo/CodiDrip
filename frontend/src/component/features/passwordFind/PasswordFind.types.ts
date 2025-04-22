import { ChangeEvent } from "react";

export interface PasswordFindProps {
  onChangeId: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickFindPassword: () => void;
}
