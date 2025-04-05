"use client";

import { useRouter } from "next/navigation";
import LoginPresenter from "./Login.presenter";
import { LoginProps } from "./Login.types";

const LoginContainer = () => {
  const router = useRouter();

  const onClickMoveJoin: LoginProps["onClickMoveJoin"] = () => {
    router.push("/join");
  };

  return (
    <>
      <LoginPresenter onClickMoveJoin={onClickMoveJoin} />
    </>
  );
};

export default LoginContainer;
