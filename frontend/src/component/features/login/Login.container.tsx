"use client";

import { useRouter } from "next/navigation";
import LoginPresenter from "./Login.presenter";
import { LoginProps } from "./Login.types";
import { useState } from "react";
import { loginUser } from "./Login.query";

const LoginContainer = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();

  const onClickMoveJoin: LoginProps["onClickMoveJoin"] = () => {
    router.push("/join");
  };

  const onChangeUserId: LoginProps["onChangeUserId"] = (event) => {
    setUserId(event.target.value);
  };

  const onChangeUserPassword: LoginProps["onChangeUserPassword"] = (event) => {
    setUserPassword(event.target.value);
  };

  const onClickLogin: LoginProps["onClickLogin"] = async () => {
    try {
      const response = await loginUser(userId, userPassword);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.user.user_id);
      router.push("/drips");
    } catch (error) {
      if (error instanceof Error) {
        console.error("로그인 실패:", error.message);
        alert(error.message);
      }
    }
  };

  return (
    <>
      <LoginPresenter
        onClickMoveJoin={onClickMoveJoin}
        onChangeUserId={onChangeUserId}
        onChangeUserPassword={onChangeUserPassword}
        onClickLogin={onClickLogin}
      />
    </>
  );
};

export default LoginContainer;
