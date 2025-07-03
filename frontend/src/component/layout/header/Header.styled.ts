"use client";

import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--card-border);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  @media (max-width: 768px) {
    height: 60px;
    padding: 0 8px;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  @media (max-width: 768px) {
    width: 100px;
  }
`;

export const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 200px;
  @media (max-width: 768px) {
    width: 100px;
  }
`;

export const Logo = styled.div`
  font-size: 2.3rem;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;
  color: var(--text-primary);
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-secondary);
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const SideMenuContainer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 15%;
  background: var(--card-bg) !important;
  /* box-shadow: none; */
  transform: translateX(${({ open }) => (open ? "0" : "-100%")});
  transition: transform 0.3s ease, background-color 0.3s ease;
  z-index: 9999;

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
  color: var(--text-primary);
  background: transparent;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-secondary);
  }
  @media (max-width: 768px) {
    padding: 4px;
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  color: var(--text-primary);
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-secondary);
  }
  @media (max-width: 768px) {
    padding: 4px;
    svg {
      width: 28px;
      height: 28px;
    }
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
  color: var(--text-primary);
  cursor: pointer;
  transition: color 0.3s ease;
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin: 1vh 0vh;
  }
`;

export const MenuItem = styled.a`
  display: block;
  padding: 10px;
  padding-left: 3vw;
  border-bottom: 1px solid var(--card-border);
  text-decoration: none;
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 1000;
  font-style: italic;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background: var(--card-border);
    color: var(--text-secondary);
  }
  @media (max-width: 768px) {
    padding-left: 22vw;
    font-size: 0.8rem;
    margin: 1vh 0vh;
  }
`;

export const SearchInputContainer = styled.div`
  min-width: 8vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;

  @media (max-width: 768px) {
    min-width: 23vw;
  }
`;

export const SearchInput = styled.input`
  min-width: 8vw;
  height: 4vh;
  background-color: var(--card-border);
  border-radius: 5px;
  outline: none;
  padding-left: 1vw;
  color: var(--text-primary);
  border: 1px solid var(--card-border);
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  &::placeholder {
    color: var(--text-muted);
  }

  @media (max-width: 768px) {
    min-width: 23vw;
    height: 28px;
    font-size: 0.9rem;
    padding-left: 8px;
  }
`;

export const Login_JoinContainer = styled.div`
  width: auto;
  height: 100%;
  margin-right: 1vw;
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
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-secondary);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
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
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2vw;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-secondary);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-right: 1vw;
  }
`;

export const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--card-border);
  overflow: hidden;
  cursor: pointer;
  margin-right: 1vw;
  transition: background-color 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin-right: 0.5vw;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  margin-right: 1vw;
  justify-content: center;
  color: var(--text-primary);
  border-radius: 50%;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--card-border);
    color: var(--text-secondary);
  }

  @media (max-width: 768px) {
    padding: 6px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
