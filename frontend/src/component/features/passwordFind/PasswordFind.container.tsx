"use client";

import { ChangeEvent, useState } from "react";
import { PasswordFindPresenter } from "./PasswordFind.presenter";
import { PasswordFindProps } from "./PasswordFind.types";
import { PasswordFindUser } from "./PasswordFind.query";
import { useRouter } from "next/navigation";

export const PasswordFindContainer = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onChangeId: PasswordFindProps["onChangeId"] = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setId(event.target.value);
    setError("");
  };

  const onChangeEmail: PasswordFindProps["onChangeEmail"] = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
    setError("");
  };

  const onClickFindPassword: PasswordFindProps["onClickFindPassword"] =
    async () => {
      try {
        const response = await PasswordFindUser(id, email);
        console.log(response);
        if (response.findPassword.success === true) {
          router.push(`/passwordFindResult?email=${encodeURIComponent(email)}`);
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error("비밀번호 찾기 실패:", error);
        setError("비밀번호 찾기 중 오류가 발생했습니다.");
      }
    };

  return (
    <>
      <PasswordFindPresenter
        onChangeId={onChangeId}
        onChangeEmail={onChangeEmail}
        onClickFindPassword={onClickFindPassword}
        error={error}
      />
    </>
  );
};

export default PasswordFindContainer;
