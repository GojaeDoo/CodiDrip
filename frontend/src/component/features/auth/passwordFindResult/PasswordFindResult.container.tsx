"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { PasswordFindResultPresenter } from "./PasswordFindResult.presenter";
import { PasswordFindResultPresenterProps } from "./passwordFindResult.types";
import { postVerifyPasswordCodeQuery } from "./PasswordFindResult.query";
import { useRouter, useSearchParams } from "next/navigation";
import ProtectedAuthRoute from "@/component/commons/ProtectedAuthRoute";

export const PasswordFindResultContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [authenticationNumber, setAuthenticationNumber] = useState("");
  const [error, setError] = useState("");

  const onChangeAuthenticationNumber: PasswordFindResultPresenterProps["onChangeAuthenticationNumber"] =
    (event: ChangeEvent<HTMLInputElement>) => {
      setAuthenticationNumber(event.target.value);
      setError("");
    };

  const handleKeyDown: PasswordFindResultPresenterProps["handleKeyDown"] = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onClickSend();
    }
  };

  const onClickSend: PasswordFindResultPresenterProps["onClickSend"] = async () => {
    if (!email) {
      setError("이메일 정보가 없습니다.");
      return;
    }

    try {
      const response = await postVerifyPasswordCodeQuery(authenticationNumber, email);
      if (response.success) {
        router.push(`/passwordReset?email=${encodeURIComponent(email)}`);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("인증번호 검증 실패:", error);
      setError("인증번호 검증 중 오류가 발생했습니다.");
    }
  };

  return (
    <ProtectedAuthRoute>
      <PasswordFindResultPresenter
        onChangeAuthenticationNumber={onChangeAuthenticationNumber}
        handleKeyDown={handleKeyDown}
        onClickSend={onClickSend}
        error={error}
      />
    </ProtectedAuthRoute>
  );
};

export default PasswordFindResultContainer;
