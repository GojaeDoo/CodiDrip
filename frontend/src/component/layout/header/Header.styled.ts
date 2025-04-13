"use client";

import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: #1a1a1a;
  border-bottom: 1px solid #333;
  display: flex;
  flex-direction: row;
`;

export const Logo = styled.div`
  width: 70%;
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
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const NavItem = styled.div`
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #666666;
  }
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
`;

export const LoginButton = styled(Button)`
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;

  &:hover {
    background-color: #ffffff;
    color: #1a1a1a;
  }
`;

export const SignupButton = styled(Button)`
  background-color: #ffffff;
  color: #1a1a1a;
  border: none;

  &:hover {
    background-color: #666666;
    color: #ffffff;
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

export const MenuItem = styled.a`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #ffffff;
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
    margin: 0 2vw 0 5vw;
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
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
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
`;

export const Logout = styled(Button)`
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
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
