import { ChangeEvent, KeyboardEvent } from "react";

export interface UserSelectProps {
  onChangeId: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onClickSend: () => void;
}
