"use client";

import { useState } from "react";
import { PasswordResetPresenter } from "./passwordReset.presenter";
import { PasswordResetProps } from "./passwordReset.types";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordResetUser } from "./passwordReset.query";

export const PasswordResetContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const encodedEmail = searchParams.get("email");
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : null;

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");

  const onChangePassword: PasswordResetProps["onChangePassword"] = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
    setError("");
  };

  const onChangePasswordCheck: PasswordResetProps["onChangePasswordCheck"] = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(event.target.value);
    setError("");
  };

  const onClickResetPassword: PasswordResetProps["onClickResetPassword"] =
    async () => {
      if (!email) {
        setError("이메일 정보가 없습니다.");
        return;
      }

      if (password !== passwordCheck) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
      }

      if (password.length < 8 || password.length > 15) {
        setError("비밀번호는 8~15자리여야 합니다.");
        return;
      }

      if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{8,15}$/.test(
          password
        )
      ) {
        setError(
          "비밀번호는 영문, 숫자, 특수문자(~!@#$%^&*)를 포함해야 합니다."
        );
        return;
      }

      try {
        const response = await PasswordResetUser(email, password);
        if (response.success) {
          router.push("/login");
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error("비밀번호 재설정 실패:", error);
        setError("비밀번호 재설정 중 오류가 발생했습니다.");
      }
    };

  return (
    <>
      <PasswordResetPresenter
        onChangePassword={onChangePassword}
        onChangePasswordCheck={onChangePasswordCheck}
        onClickResetPassword={onClickResetPassword}
        error={error}
      />
    </>
  );
};

export default PasswordResetContainer;
