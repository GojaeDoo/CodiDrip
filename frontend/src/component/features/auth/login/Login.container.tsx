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
    console.log("로그인 버튼 클릭됨");
    console.log("입력된 userId:", userId);
    console.log("입력된 userPassword:", userPassword);
    
    if (!userId || !userPassword) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    
    try {
      console.log("API 호출 시작...");
      const response = await postLoginUserQuery(userId, userPassword);
      console.log("API 응답:", response);
      const currentUserId = response.user.user_id;
      const isAdmin = response.user.is_admin === true || response.user.is_admin === 1 || response.user.is_admin === "true"; 
      login(response.token, currentUserId, isAdmin);
      
      try {
        const responseProfile = await getProfileCheckQuery(currentUserId);
        if (responseProfile) {
          console.log("프로필이 존재합니다. 메인 페이지로 이동합니다.");
          router.push("/drips");
        } else {
          console.log("프로필이 존재하지 않습니다. 프로필 생성 페이지로 이동합니다.");
          router.push("/profileEdit");
        }
      } catch (profileError) {
        console.error("프로필 확인 중 에러:", profileError);
        // 프로필 확인 실패해도 로그인은 성공했으므로 메인 페이지로 이동
        router.push("/drips");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      if (error instanceof Error) {
        // 401 에러(아이디/비밀번호 불일치) 또는 기타 에러 메시지 표시
        alert(error.message);
      } else {
        // 예상치 못한 에러의 경우
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
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
