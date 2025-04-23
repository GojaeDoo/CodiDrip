import * as C from "../../commons/Commons.styled";
import { UserSelectProps } from "./UserSelect.types";

export const UserSelectPresenter = (props: UserSelectProps) => {
  return (
    <>
      <C.Input placeholder="아이디" onChange={props.onChangeId} />
      <C.Button onClick={props.onClickSend}>찾기</C.Button>
    </>
  );
};

export default UserSelectPresenter;
