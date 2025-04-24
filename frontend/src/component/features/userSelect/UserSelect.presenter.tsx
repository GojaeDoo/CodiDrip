import * as C from "../../commons/Commons.styled";
import { UserSelectProps } from "./UserSelect.types";

export const UserSelectPresenter = (props: UserSelectProps) => {
  return (
    <>
      <C.Input
        placeholder="아이디입력"
        onChange={props.onChangeId}
        onKeyDown={props.handleKeyDown}
      />
      <C.Button onClick={props.onClickSend}>확인</C.Button>
    </>
  );
};

export default UserSelectPresenter;
