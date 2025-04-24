"use client";

import { ChangeEvent, useState } from "react";
import { PasswordFindResultPresenter } from "./PasswordFindResult.presenter";
import { PasswordFindResultProps } from "./passwordFindResult.types";
import { verifyPasswordCode } from "./PasswordFindResult.query";
import { useRouter, useSearchParams } from "next/navigation";

export const PasswordFindResultContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [authenticationNumber, setAuthenticationNumber] = useState("");
  const [error, setError] = useState("");

  const onChangeAuthenticationNumber: PasswordFindResultProps["onChangeAuthenticationNumber"] =
    (event: ChangeEvent<HTMLInputElement>) => {
      setAuthenticationNumber(event.target.value);
      setError("");
    };

  const onClickSend: PasswordFindResultProps["onClickSend"] = async () => {
    if (!email) {
      setError("이메일 정보가 없습니다.");
      return;
    }

    try {
      const response = await verifyPasswordCode(authenticationNumber, email);
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
    <>
      <PasswordFindResultPresenter
        onChangeAuthenticationNumber={onChangeAuthenticationNumber}
        onClickSend={onClickSend}
        error={error}
      />
    </>
  );
};

export default PasswordFindResultContainer;
