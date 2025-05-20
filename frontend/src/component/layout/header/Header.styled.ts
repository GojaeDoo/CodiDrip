"use client";

import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: #1a1a1a;
  border-bottom: 1px solid #333;
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 1000;
`;

export const Logo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.3rem;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #666666;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const SideMenuContainer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 15%;
  background: #1a1a1a;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transform: translateX(${({ open }) => (open ? "0" : "-100%")});
  transition: transform 0.3s ease;
  z-index: 1001;

  @media (max-width: 768px) {
    width: 70%;
  }
`;

export const BurgerButtonContainer = styled.div`
  width: 5vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 15vw;
  }
`;

export const BurgerButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  color: #ffffff;
  background: transparent;

  &:hover {
    color: #666666;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  color: #ffffff;

  &:hover {
    color: #666666;
  }
`;

export const MenuLogo = styled.div`
  margin: 2vh 0vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.3rem;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s ease;
`;

export const MenuItem = styled.a`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #333;
    color: #666666;
  }
`;

export const SearchInputContainer = styled.div`
  min-width: 8vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;

  @media (max-width: 768px) {
    min-width: 20vw;
  }
`;

export const SearchInput = styled.input`
  min-width: 8vw;
  height: 4vh;
  background-color: #333;
  border-radius: 5px;
  outline: none;
  padding-left: 1vw;
  color: #ffffff;
  border: 1px solid #666666;

  &::placeholder {
    color: #666666;
  }

  @media (max-width: 768px) {
    min-width: 20vw;
  }
`;

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
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2vw 0 5vw;
  cursor: pointer;

  &:hover {
    color: #666666;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 0 1vw 0 2vw;
  }
`;

export const Join = styled.div`
  width: auto;
  height: 100%;
  font-size: 1.4rem;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2vw;
  cursor: pointer;

  &:hover {
    color: #666666;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-right: 1vw;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;

  @media (max-width: 768px) {
    gap: 1vw;
  }
`;

export const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #333;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const Logout = styled.div`
  width: auto;
  height: 100%;
  font-size: 1.4rem;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2vw;
  cursor: pointer;

  &:hover {
    color: #666666;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-right: 1vw;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
