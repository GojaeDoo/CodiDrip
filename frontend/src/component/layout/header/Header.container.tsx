"use client";
import React, { useEffect, useState } from "react";
import HeaderPresenter from "./Header.presenter";
import { useRouter } from "next/navigation";

const HeaderContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    setIsLoggedIn(!!token);
    setUserId(storedUserId);
  }, []);

  const onClickMoveLogin = () => {
    router.push("/login");
  };

  const onClickMoveJoin = () => {
    router.push("/join");
  };

  const onClickLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserId(null);
    router.push("/");
  };

  return (
    <HeaderPresenter
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClickMoveLogin={onClickMoveLogin}
      onClickMoveJoin={onClickMoveJoin}
      onClickLogout={onClickLogout}
      isLoggedIn={isLoggedIn}
    />
  );
};

export default HeaderContainer;
