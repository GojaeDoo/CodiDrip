import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const shine = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const pieceAppear = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(var(--rotation));
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`;

const contentAppear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const titleLine = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

export const IntroImage = styled.img`
  width: 100%;
  height: 88vh;
`;

export const IntroWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  background: #fff;
  overflow: hidden;
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent 30%,
      rgba(255, 255, 255, 0.06) 50%,
      transparent 70%
    );
    background-size: 200% 100%;
    animation: ${shine} 8s linear infinite;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
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
  animation: ${fadeIn} 1.5s ease-out;
  transition: transform 0.5s ease-out;

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
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  backdrop-filter: blur(0.1px);
`;

export const ImagePieces = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  z-index: 0;
`;

export const ImagePiece = styled.div<{ delay: number }>`
  background-image: url("/images/intro/introImage.jpg");
  background-size: 800% 800%;
  background-position: ${(props) => {
    const x = ((props.delay % 8) * 100) / 7;
    const y = (Math.floor(props.delay / 8) * 100) / 7;
    return `${x}% ${y}%`;
  }};
  opacity: 0;
  --rotation: ${(props) => (props.delay % 2 === 0 ? -10 : 10)}deg;
  transform: scale(0.8) rotate(var(--rotation));
  animation: ${pieceAppear} 1s ease-out forwards;
  animation-delay: ${(props) => props.delay * 0.05}s;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(0deg);
    z-index: 1;
  }
`;

export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  text-align: center;
  padding: 0 20px;
  opacity: 0;
  transform: translateY(50px);
  animation: ${contentAppear} 1s ease-out forwards;
  animation-delay: 1.5s;
`;

export const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  color: #1a1a1a;
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
    background: linear-gradient(90deg, #1a1a1a, transparent);
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
  color: #333;
  margin-bottom: 2rem;
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
  transition: color 0.3s ease;

  &:hover {
    color: #1a1a1a;
  }
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
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
  background-color: #1a1a1a;
  color: white;
  animation: ${pulse} 2s infinite;

  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;

  &:hover {
    background-color: #1a1a1a;
    color: white;
    transform: translateY(-2px);
  }
`;

export const FashionGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  opacity: 0.1;
  z-index: 0;
`;

export const FashionItem = styled.div`
  background-size: cover;
  background-position: center;
  transition: all 0.5s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    opacity: 0.3;
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
    background: rgba(0, 0, 0, 0.02);
    transform: translateX(10px);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 1.8rem;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: #f8f8f8;
  border-radius: 12px;
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;

  ${Feature}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: #1a1a1a;
    color: white;
  }
`;

export const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: #1a1a1a;
  margin-bottom: 0.3rem;
  transition: transform 0.3s ease;

  ${Feature}:hover & {
    transform: translateX(5px);
  }
`;

export const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  transition: opacity 0.3s ease;

  ${Feature}:hover & {
    opacity: 0.8;
  }
`;
