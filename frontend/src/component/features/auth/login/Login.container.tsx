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
      const isAdmin = response.user.is_admin === true || response.user.is_admin === 1 || response.user.is_admin === "true";
      
      console.log("=== 로그인 응답 정보 ===");
      console.log("전체 응답:", response);
      console.log("사용자 정보:", response.user);
      console.log("User ID:", currentUserId);
      console.log("Is Admin:", isAdmin);
      console.log("Is Admin 타입:", typeof isAdmin);
      console.log("=== 로그인 응답 정보 끝 ===");
      
      login(response.token, currentUserId, isAdmin);
      
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
