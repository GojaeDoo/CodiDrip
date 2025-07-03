"use client";

import { useRouter } from "next/navigation";
import LoginPresenter from "./Login.presenter";
import { LoginPresenterProps } from "./Login.types";
import { useState } from "react";
import { postLoginUserQuery, getProfileCheckQuery } from "./Login.query";
import { useAuth } from "@/context/AuthContext";

const LoginContainer = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const onClickMoveJoin: LoginPresenterProps["onClickMoveJoin"] = () => {
    router.push("/join");
  };

  const onClickMoveIdFind: LoginPresenterProps["onClickMoveIdFind"] = () => {
    router.push("/idFind");
  };

  const onClickMovePasswordFind: LoginPresenterProps["onClickMovePasswordFind"] = () => {
    router.push("/passwordFind");
  };

  const onChangeUserId: LoginPresenterProps["onChangeUserId"] = (event) => {
    setUserId(event.target.value);
  };

  const onChangeUserPassword: LoginPresenterProps["onChangeUserPassword"] = (event) => {
    setUserPassword(event.target.value);
  };

  const handleKeyDown: LoginPresenterProps["handleKeyDown"] = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onClickLogin();
    }
  };

  const onClickLogin: LoginPresenterProps["onClickLogin"] = async () => {
    try {
      const response = await postLoginUserQuery(userId, userPassword);
      const currentUserId = response.user.user_id;
      const isAdmin = response.user.is_admin === true || response.user.is_admin === 1 || response.user.is_admin === "true"; 
      login(response.token, currentUserId, isAdmin);
      const responseProfile = await getProfileCheckQuery(currentUserId);
      router.push("/drips");
      if (responseProfile) {
        router.push("/drips");
      } else {
        router.push("/profileEdit");
      }
    } catch (error) {
      if (error instanceof Error) {
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
