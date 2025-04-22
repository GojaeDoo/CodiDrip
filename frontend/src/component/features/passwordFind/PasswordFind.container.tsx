"use client";

import { ChangeEvent, useState } from "react";
import PasswordFindPresenter from "./PasswordFind.presenter";
import { PasswordFindProps } from "./PasswordFind.types";
import { PasswordFindUser } from "./PasswordFind.query";
import { useRouter } from "next/navigation";

export const PasswordFindContainer = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const onChangeId: PasswordFindProps["onChangeId"] = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setId(event.target.value);
  };

  const onChangeEmail: PasswordFindProps["onChangeEmail"] = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const onClickFindPassword: PasswordFindProps["onClickFindPassword"] =
    async () => {
      if (id === "" || email === "") {
        alert("아이디와 이메일을 입력해주세요.");
      } else {
        try {
          const response = await PasswordFindUser(id, email);
          console.log(response.findPassword.success);
          if (response.findPassword.success === true) {
            router.push("/passwordFindResult");
          } else {
            alert("일치하는 정보가 없습니다. 다시 확인해주세요.");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

  return (
    <PasswordFindPresenter
      onChangeId={onChangeId}
      onChangeEmail={onChangeEmail}
      onClickFindPassword={onClickFindPassword}
    />
  );
};

export default PasswordFindContainer;
