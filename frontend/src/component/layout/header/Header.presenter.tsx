"use client"; // 👈 클라이언트 전용으로 지정

import React from "react";
import { HeaderProps } from "./Header.types";
import * as S from "./Header.styled";
import { Menu, X } from "lucide-react";

const HeaderPresenter = (props: HeaderProps) => {
  return (
    <S.HeaderContainer>
      <S.LeftSection>
        <S.BurgerButtonContainer>
          <S.BurgerButton
            onClick={() => props.setIsOpen((prev: boolean) => !prev)}
          >
            {props.isOpen ? <X size={36} /> : <Menu size={36} />}
          </S.BurgerButton>
        </S.BurgerButtonContainer>
        <S.SearchInputContainer>
          <S.SearchInput onChange={props.onChangeSearchInput} onKeyDown={props.onEnterSearchInput}/>
        </S.SearchInputContainer>
      </S.LeftSection>

      <S.CenterSection>
        <S.Logo onClick={props.onClickMain}>CODIDRIP</S.Logo>
      </S.CenterSection>

      <S.RightSection>
        {props.isLoggedIn ? (
          <S.ButtonContainer>
            <S.UserContainer>
              <S.ProfileImage>
                {props.userProfile?.profile_image ? (
                  <img
                    src={props.userProfile.profile_image}
                    alt="Profile"
                    onClick={props.onClickMoveMyPage}
                  />
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
      </S.RightSection>

      <S.SideMenuContainer open={props.isOpen}>
        <S.CloseButton onClick={() => props.setIsOpen(false)}>
          <X size={36} />
        </S.CloseButton>
        <S.MenuLogo>CODIDRIP</S.MenuLogo>
        <S.MenuItem onClick={props.onClickMoveDrips}>DRIP 게시글</S.MenuItem>
        <S.MenuItem onClick={props.onClickMoveDripUser}>DRIP 사용자</S.MenuItem>
        <S.MenuItem onClick={props.onClickMoveMyPage}>마이페이지</S.MenuItem>
        <S.MenuItem onClick={props.onClickMoveFreeBoardList}>자유게시판</S.MenuItem>
      </S.SideMenuContainer>
    </S.HeaderContainer>
  );
};

export default HeaderPresenter;
