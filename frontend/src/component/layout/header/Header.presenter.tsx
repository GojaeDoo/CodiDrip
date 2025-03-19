"use client"; // 👈 클라이언트 전용으로 지정

import React from "react";
import { HeaderProps } from "./Header.types";
import * as S from "./Header.styled";
import { Menu, X } from "lucide-react";
import { FC } from "react";

const HeaderPresenter: FC<HeaderProps> = ({ isOpen, setIsOpen }) => {
  return (
    <S.HeaderContainer>
      <S.BurgerButtonContainer>
        <S.BurgerButton onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <X size={36} /> : <Menu size={36} />}
        </S.BurgerButton>
      </S.BurgerButtonContainer>
      <S.SideMenuContainer open={isOpen}>
        <S.CloseButton onClick={() => setIsOpen(false)}>
          <X size={36} />
        </S.CloseButton>
        <S.MenuItem href="#">Drips</S.MenuItem>
        <S.MenuItem href="#">Drip users</S.MenuItem>
        <S.MenuItem href="#">건의사항/신고</S.MenuItem>
      </S.SideMenuContainer>
      <S.SearchInputContainer>
        <S.SearchInput />
      </S.SearchInputContainer>
      <S.Title>DripDrop</S.Title>
      <S.Login_JoinContainer>
        <S.Login>Login</S.Login>
        <S.Join>Join</S.Join>
      </S.Login_JoinContainer>
    </S.HeaderContainer>
  );
};
export default HeaderPresenter;
