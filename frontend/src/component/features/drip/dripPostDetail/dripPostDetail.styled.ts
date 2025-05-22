import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const DripPostDetailWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #242424;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const PostContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #1a1a1a;
`;

export const PinContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${(props) => props.x}%;
  top: ${(props) => props.y}%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

export const PinMarker = styled.div`
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
  transition: all 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${PinContainer}:hover & {
    transform: rotate(-45deg) scale(1.1);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
  }
`;

export const PinDescription = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 10;

  ${PinContainer}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid rgba(0, 0, 0, 0.8);
  }
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background-color: #242424;
  border-radius: 8px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;
`;

export const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
`;

export const UserStats = styled.p`
  font-size: 0.9rem;
  color: #888;
  margin: 0.25rem 0 0;
`;

export const InteractionSection = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid #333;
`;

export const InteractionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }

  svg {
    color: #fff;
  }
`;

export const TagSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid #333;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  background-color: #333;
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.9rem;
`;

export const ImageNavigation = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none;
`;

export const NavButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

export const StyledChevronLeft = styled.div`
  width: 24px;
  height: 24px;
  border-top: 2px solid white;
  border-left: 2px solid white;
  transform: rotate(-45deg);
`;

export const StyledChevronRight = styled.div`
  width: 24px;
  height: 24px;
  border-top: 2px solid white;
  border-right: 2px solid white;
  transform: rotate(45deg);
`;

export const ImageCounter = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;
