import { KeyboardEvent } from "react";

export interface IdFindPresenterProps {
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickIdFind: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}
