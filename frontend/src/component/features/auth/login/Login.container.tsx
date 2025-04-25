"use client";

import { useRouter } from "next/navigation";
import LoginPresenter from "./Login.presenter";
import { LoginProps } from "./Login.types";
import { useState } from "react";
import { loginUser, profileCheck } from "./Login.query";
import { useAuth } from "@/context/AuthContext";

const LoginContainer = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const onClickMoveJoin: LoginProps["onClickMoveJoin"] = () => {
    router.push("/join");
  };

  const onClickMoveIdFind: LoginProps["onClickMoveIdFind"] = () => {
    router.push("/idFind");
  };

  const onClickMovePasswordFind: LoginProps["onClickMovePasswordFind"] = () => {
    router.push("/passwordFind");
  };

  const onChangeUserId: LoginProps["onChangeUserId"] = (event) => {
    setUserId(event.target.value);
  };

  const onChangeUserPassword: LoginProps["onChangeUserPassword"] = (event) => {
    setUserPassword(event.target.value);
  };

  const handleKeyDown: LoginProps["handleKeyDown"] = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onClickLogin();
    }
  };

  const onClickLogin: LoginProps["onClickLogin"] = async () => {
    try {
      const response = await loginUser(userId, userPassword);
      const currentUserId = response.user.user_id;
      login(response.token, currentUserId);
      console.log("User ID:", currentUserId);
      const responseProfile = await profileCheck(currentUserId);
      console.log("responseProfile : ", responseProfile);
      setId(currentUserId);
      router.push("/drips");
      if (responseProfile) {
        router.push("/drips");
      } else {
        router.push("/profileEdit");
      }
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
        onClickMoveIdFind={onClickMoveIdFind}
        onClickMovePasswordFind={onClickMovePasswordFind}
        onChangeUserId={onChangeUserId}
        onChangeUserPassword={onChangeUserPassword}
        handleKeyDown={handleKeyDown}
        onClickLogin={onClickLogin}
        profiles={[]}
      />
    </>
  );
};

export default LoginContainer;
