"use client"; // 👈 클라이언트 전용으로 지정

import React from "react";
import { HeaderProps } from "./Header.types";
import * as S from "./Header.styled";
import { Menu, X } from "lucide-react";

const HeaderPresenter = ({
  isOpen,
  setIsOpen,
  onClickMoveLogin,
  onClickMoveJoin,
  onClickLogout,
  isLoggedIn,
  userProfile,
}: HeaderProps) => {
  return (
    <S.HeaderContainer>
      <S.BurgerButtonContainer>
        <S.BurgerButton onClick={() => setIsOpen((prev: boolean) => !prev)}>
          {isOpen ? <X size={36} /> : <Menu size={36} />}
        </S.BurgerButton>
      </S.BurgerButtonContainer>
      <S.SideMenuContainer open={isOpen}>
        <S.CloseButton onClick={() => setIsOpen(false)}>
          <X size={36} />
        </S.CloseButton>
        <S.MenuItem href="#">Drip 게시글</S.MenuItem>
        <S.MenuItem href="#">Drip 유저</S.MenuItem>
        <S.MenuItem href="#">자유게시판</S.MenuItem>
        <S.MenuItem href="#">마이페이지</S.MenuItem>
        <S.MenuItem href="#">건의사항/신고</S.MenuItem>
      </S.SideMenuContainer>
      <S.SearchInputContainer>
        <S.SearchInput />
      </S.SearchInputContainer>
      <S.Logo>DripDrop</S.Logo>
      {isLoggedIn ? (
        <S.ButtonContainer>
          <S.UserContainer>
            <S.ProfileImage>
              {userProfile?.profile_image && (
                <img src={userProfile.profile_image} alt="Profile" />
              )}
            </S.ProfileImage>
            <S.Logout onClick={onClickLogout}>Logout</S.Logout>
          </S.UserContainer>
        </S.ButtonContainer>
      ) : (
        <S.Login_JoinContainer>
          <S.Login onClick={onClickMoveLogin}>Login</S.Login>
          <S.Join onClick={onClickMoveJoin}>Join</S.Join>
        </S.Login_JoinContainer>
      )}
    </S.HeaderContainer>
  );
};

export default HeaderPresenter;
