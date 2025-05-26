import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const DripPostDetailWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #1e1e1e;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const ImageSection = styled.div`
  width: 100%;
  background: #000;
  position: relative;
  @media (min-width: 1024px) {
    width: 60%;
  }
`;

export const ImageWrapper = styled.div<{ $aspectRatio: string }>`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: ${props => props.$aspectRatio};
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #1e1e1e;
  @media (min-width: 1024px) {
    width: 40%;
    padding: 2rem;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #2d2d2d;
`;

export const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #333;
`;

export const UserName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

export const UserStats = styled.p`
  font-size: 0.9rem;
  color: #a0a0a0;
  margin: 0.25rem 0 0;
`;

export const InteractionSection = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #2d2d2d;
  justify-content: space-between;
`;

export const InteractionButton = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 1rem 0.5rem;
  border-radius: 12px;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #232323;
    transform: translateY(-2px) scale(1.05);
  }

  svg {
    color: #ffffff;
    font-size: 1.5rem;
    transition: color 0.2s;
  }

  &:hover svg {
    color: #ff4d4d;
  }

  span {
    font-size: 1rem;
    font-weight: 500;
    margin-top: 0.25rem;
    letter-spacing: 0.02em;
  }
`;

export const TagSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #2d2d2d;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  background-color: #2d2d2d;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #3d3d3d;
  }
`;

export const PinContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const PinMarker = styled.div`
  width: 28px;
  height: 28px;
  background-color: #ff4d4d;
  border-radius: 50%;
  border: 2px solid #1e1e1e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const PinDescription = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2d2d2d;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  margin-top: 8px;
  font-size: 0.9rem;
  z-index: 3;

  ${PinContainer}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

export const ImageNavigation = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem;
  pointer-events: none;
`;

export const NavButton = styled.button`
  background-color: rgba(45, 45, 45, 0.9);
  border: none;
  color: #ffffff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #3d3d3d;
    transform: scale(1.1);
  }
`;

export const ImageCounter = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(4px);
`;

export const CommentSection = styled.div`
  width: 100%;
  padding: 1.5rem;
  background-color: #1e1e1e;
  border-top: 1px solid #2d2d2d;
`;