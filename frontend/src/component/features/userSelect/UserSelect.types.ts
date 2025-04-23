import { ChangeEvent } from "react";

export interface UserSelectProps {
  onChangeId: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSend: () => void;
}
