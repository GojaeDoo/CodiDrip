"use client";

import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: #ffffff;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: row;
`;

// Header 햄버거 버튼 시작

// 햄버거 버튼 누르면 옆에 사이드바 나오게 하기
export const SideMenuContainer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 15%;
  background: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(${({ open }) => (open ? "0" : "-100%")});
  transition: transform 0.3s ease;
  z-index: 10;
`;

export const BurgerButtonContainer = styled.div`
  width: 5vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    margin-left: 2vw;
  }
`;

export const BurgerButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: flex-end;

  &:hover {
    opacity: 0.7;
  }
`;

export const MenuItem = styled.a`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: black;
  &:hover {
    background: #f4f4f4;
  }
`;

// Header 햄버거 버튼 끝

// Header Search창 시작

export const SearchInputContainer = styled.div`
  min-width: 8vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  @media (max-width: 768px) {
    margin: 0 2vw 0 5vw;
  }
`;

export const SearchInput = styled.input`
  min-width: 8vw;
  height: 4vh;
  background-color: #d9d9d9;
  border-radius: 5px;
  outline: none;
  padding-left: 1vw;
`;

// Header Search창 끝

// Header Title

// export const Title = styled.div`
//   margin: 0 auto;
//   width: auto;
//   height: 100%;
//   font-size: 2rem;
//   font-family: "Inter", sans-serif;
//   font-weight: 1000;
//   font-style: italic;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// 로그인 , 회원가입

export const Login_JoinContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const Login = styled.div`
  width: auto;
  height: 100%;
  font-size: 1.4rem;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2vw 0 5vw;
  cursor: pointer;
`;

export const Join = styled.div`
  width: auto;
  height: 100%;
  font-size: 1.4rem;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2vw;
  cursor: pointer;
`;
