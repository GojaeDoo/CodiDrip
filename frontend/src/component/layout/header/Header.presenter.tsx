"use client"; // 👈 클라이언트 전용으로 지정

import React from "react";
import { HeaderProps } from "./Header.types";
import * as S from "./Header.styled";
import { Menu, X } from "lucide-react";

const HeaderPresenter = (props: HeaderProps) => {
  return (
    <S.HeaderContainer>
      <S.BurgerButtonContainer>
        <S.BurgerButton
          onClick={() => props.setIsOpen((prev: boolean) => !prev)}
        >
          {props.isOpen ? <X size={36} /> : <Menu size={36} />}
        </S.BurgerButton>
      </S.BurgerButtonContainer>
      <S.SideMenuContainer open={props.isOpen}>
        <S.CloseButton onClick={() => props.setIsOpen(false)}>
          <X size={36} />
        </S.CloseButton>
        <S.MenuItem href="#">DRIP 공유</S.MenuItem>
        <S.MenuItem href="#">DRIP 유저</S.MenuItem>
        <S.MenuItem href="#">자유게시판</S.MenuItem>
        <S.MenuItem href="/myPage">마이페이지</S.MenuItem>
        <S.MenuItem href="#">건의사항/신고</S.MenuItem>
      </S.SideMenuContainer>
      <S.SearchInputContainer>
        <S.SearchInput />
      </S.SearchInputContainer>
      <S.Logo onClick={props.onClickMain}>CODIDRIP</S.Logo>
      {props.isLoggedIn ? (
        <S.ButtonContainer>
          <S.UserContainer>
            <S.ProfileImage>
              {props.userProfile?.profile_image ? (
                <img src={props.userProfile.profile_image} alt="Profile" />
              ) : null}
            </S.ProfileImage>
            <S.Logout onClick={props.onClickLogout}>Logout</S.Logout>
          </S.UserContainer>
        </S.ButtonContainer>
      ) : (
        <S.Login_JoinContainer>
          <S.Login onClick={props.onClickMoveLogin}>Login</S.Login>
          <S.Join onClick={props.onClickMoveJoin}>Join</S.Join>
        </S.Login_JoinContainer>
      )}
    </S.HeaderContainer>
  );
};

export default HeaderPresenter;
