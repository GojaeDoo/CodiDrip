import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const scatter = keyframes`
  from {
    transform: translate(0, 0);
    opacity: 1;
  }
  to {
    transform: translate(var(--tx, 0), var(--ty, 0));
    opacity: 0;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const titleLine = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const contentAppear = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const IntroWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: var(--background);
  display: flex;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;
`;

export const SplashScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--background);
  z-index: 10;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0s;
  transition: background-color 0.3s ease;
`;

export const SplashText = styled.div`
  font-size: 2.5rem;
  font-weight: 300;
  font-family: "Pretendard", sans-serif;
  letter-spacing: -0.02em;
  line-height: 1.4;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out 0.5s forwards,
    ${fadeOut} 0.5s ease-out 3.5s forwards;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
`;

export const BrandName = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out 2s forwards;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
`;

export const BrandLetter = styled.span<{ delay: number }>`
  display: inline-block;
  animation: ${scatter} 1s ease-out forwards;
  animation-delay: ${(props) => 3 + props.delay * 0.1}s;
`;

export const MainContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  opacity: 0;
  z-index: 20;
  animation: ${contentAppear} 0.8s ease-out forwards;
  animation-delay: 4s;
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
  position: relative;
  z-index: 1;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 4.2s;
`;

export const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
  animation: ${slideUp} 0.8s ease-out;
  line-height: 1.2;
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--text-primary), transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export const SubTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-secondary);
  }
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: var(--text-primary);
  max-width: 500px;
  margin-bottom: 3rem;
  line-height: 1.8;
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: translateX(10px);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: 0.6s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

export const Button = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: var(--button-bg);
  color: var(--button-text);

  &:hover {
    background-color: var(--button-hover);
    transform: translateY(-2px);
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: var(--text-primary);
  border: 2px solid var(--text-primary);

  &:hover {
    background-color: var(--text-primary);
    color: var(--background);
    transform: translateY(-2px);
  }
`;

export const RightSection = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 4.2s;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/intro/introImage.jpg");
  background-size: cover;
  background-position: center;
  animation: ${slideUp} 1.5s ease-out;
  transition: transform 0.5s ease-out;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 20%,
    black 80%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 20%,
    black 80%,
    transparent 100%
  );

  &:hover {
    transform: scale(1.05);
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
`;
