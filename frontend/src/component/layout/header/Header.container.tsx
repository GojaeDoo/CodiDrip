"use client";
import React, { useEffect, useState } from "react";
import HeaderPresenter from "./Header.presenter";
import { FC } from "react";

const HeaderContainer: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 페이지가 로드될 때 isOpen을 false로 설정
  useEffect(() => {
    setIsOpen(false);
  }, []);

  return <HeaderPresenter isOpen={isOpen} setIsOpen={setIsOpen} />;
};

export default HeaderContainer;
