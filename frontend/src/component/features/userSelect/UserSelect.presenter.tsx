import { UserSelectProps } from "./UserSelect.types";

export const UserSelectPresenter = (props: UserSelectProps) => {
  return (
    <>
      <input type="text" onChange={props.onChangeId} />
      <button onClick={props.onClickSend}>검색</button>
    </>
  );
};

export default UserSelectPresenter;
