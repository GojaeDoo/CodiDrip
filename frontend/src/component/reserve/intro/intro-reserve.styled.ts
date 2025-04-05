import styled, { keyframes } from "styled-components";

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
  background: #1a1a1a;
  display: flex;
  position: relative;
  overflow: hidden;
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
  background: #1a1a1a;
  z-index: 10;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0s;
`;

export const SplashText = styled.div`
  font-size: 2.5rem;
  font-weight: 300;
  font-family: "Pretendard", sans-serif;
  letter-spacing: -0.02em;
  line-height: 1.4;
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out 0.5s forwards,
    ${fadeOut} 0.5s ease-out 3.5s forwards;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const BrandName = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 4rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out 2s forwards;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  color: #ffffff;
  margin-bottom: 1rem;
  animation: ${slideUp} 0.8s ease-out;
  line-height: 1.2;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #ffffff, transparent);
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
  color: #ffffff;
  margin-bottom: 2rem;
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
  transition: color 0.3s ease;

  &:hover {
    color: #666666;
  }
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  max-width: 500px;
  margin-bottom: 3rem;
  line-height: 1.8;
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
  transition: transform 0.3s ease;

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
  background-color: #ffffff;
  color: #1a1a1a;

  &:hover {
    background-color: #666666;
    transform: translateY(-2px);
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;

  &:hover {
    background-color: #ffffff;
    color: #1a1a1a;
    transform: translateY(-2px);
  }
`;

export const Features = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 4rem;
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: 0.8s;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(10px);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 1.8rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;

  ${Feature}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: #ffffff;
    color: #1a1a1a;
  }
`;

export const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 0.3rem;
  transition: transform 0.3s ease;

  ${Feature}:hover & {
    transform: translateX(5px);
  }
`;

export const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: #ffffff;
  line-height: 1.5;
  transition: opacity 0.3s ease;

  ${Feature}:hover & {
    opacity: 0.8;
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
    rgba(26, 26, 26, 0.8) 0%,
    rgba(26, 26, 26, 0.4) 50%,
    rgba(26, 26, 26, 0) 100%
  );
  z-index: 1;
`;
