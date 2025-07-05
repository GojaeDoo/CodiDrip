"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { PasswordFindPresenter } from "./PasswordFind.presenter";
import { PasswordFindPresenterProps } from "./PasswordFind.types";
import { getPasswordFindUserQuery } from "./PasswordFind.query";
import { useRouter } from "next/navigation";
import ProtectedAuthRoute from "@/component/commons/ProtectedAuthRoute";

export const PasswordFindContainer = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onChangeId: PasswordFindPresenterProps["onChangeId"] = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setId(event.target.value);
    setError("");
  };

  const onChangeEmail: PasswordFindPresenterProps["onChangeEmail"] = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
    setError("");
  };

  const handleKeyDown: PasswordFindPresenterProps["handleKeyDown"] = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onClickFindPassword();
    }
  };

  const onClickFindPassword: PasswordFindPresenterProps["onClickFindPassword"] =
    async () => {
      try {
        const response = await getPasswordFindUserQuery(id, email);
        if (response.findPassword.success === true) {
          router.push(`/passwordFindResult?email=${encodeURIComponent(email)}`);
        } else {
          alert(response.findPassword.message);
        }
      } catch (error) {
        console.error("비밀번호 찾기 실패:", error);
        setError("비밀번호 찾기 중 오류가 발생했습니다.");
      }
    };

  return (
    <ProtectedAuthRoute>
      <PasswordFindPresenter
        onChangeId={onChangeId}
        onChangeEmail={onChangeEmail}
        handleKeyDown={handleKeyDown}
        onClickFindPassword={onClickFindPassword}
        error={error}
      />
    </ProtectedAuthRoute>
  );
};

export default PasswordFindContainer;
