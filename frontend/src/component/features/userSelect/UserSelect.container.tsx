"use client";

import { ChangeEvent, useState } from "react";
import UserSelectPresenter from "./UserSelect.presenter";
import { UserSelectProps } from "./UserSelect.types";
import { UserSelectQuery } from "./UserSelect.query";

export const UserSelectContainer = () => {
  const [id, setId] = useState<string>("");

  const onChangeId: UserSelectProps["onChangeId"] = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setId(event.target.value);
  };

  const onClickSend = async () => {
    try {
      const response = await UserSelectQuery(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <UserSelectPresenter onChangeId={onChangeId} onClickSend={onClickSend} />
    </>
  );
};

export default UserSelectContainer;
