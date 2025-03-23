"use client";
import React, { useEffect, useState } from "react";
import HeaderPresenter from "./Header.presenter";
import { FC } from "react";
import { useRouter } from "next/navigation";

const HeaderContainer: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  // 페이지가 로드될 때 isOpen을 false로 설정
  useEffect(() => {
    setIsOpen(false);
  }, []);

  const onClickMoveLogin = () => {
    router.push("/login");
  };

  return (
    <HeaderPresenter
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClickMoveLogin={onClickMoveLogin}
    />
  );
};

export default HeaderContainer;
