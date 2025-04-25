import { KeyboardEvent } from "react";

export interface IdFindProps {
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickIdFind: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}
