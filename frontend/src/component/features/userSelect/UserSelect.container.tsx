"use client";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import UserSelectPresenter from "./UserSelect.presenter";
import { UserSelectProps } from "./UserSelect.types";
import { FindUserEmail } from "./UserSelect.query";

export const UserSelectContainer = () => {
  const [id, setId] = useState("");

  const onChangeId: UserSelectProps["onChangeId"] = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setId(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickSend();
    }
  };

  const onClickSend: UserSelectProps["onClickSend"] = async () => {
    console.log("id: " + id);
    try {
      const response = await FindUserEmail(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <UserSelectPresenter
        onChangeId={onChangeId}
        onClickSend={onClickSend}
        handleKeyDown={handleKeyDown}
      />
    </>
  );
};

export default UserSelectContainer;
