"use client"; // 👈 클라이언트 전용으로 지정

import React from "react";
import { HeaderProps } from "./Header.types";
import * as S from "./Header.styled";
import * as C from "../../commons/Commons.styled";
import { Menu, X } from "lucide-react";

const HeaderPresenter = ({
  isOpen,
  setIsOpen,
  onClickMoveLogin,
  onClickMoveJoin,
}: HeaderProps) => {
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
      <C.Title>DripDrop</C.Title>
      <S.Login_JoinContainer>
        <S.Login onClick={onClickMoveLogin}>Login</S.Login>
        <S.Join onClick={onClickMoveJoin}>Join</S.Join>
      </S.Login_JoinContainer>
    </S.HeaderContainer>
  );
};

export default HeaderPresenter;
