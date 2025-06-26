import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const DripPostDetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 0 auto;
  width: 100%;
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const MainSection = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CommentSection = styled.div`
  flex: 1;
  background: #1e1e1e;
  border-radius: 16px;
  padding: 1.5rem;
  @media (max-width: 1024px) {
    min-width: 0;
    padding: 1.5rem 0;
    background: none;
  }
`;

export const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background: #000;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
`;

export const ProfileBox = styled.div`
  background: #1e1e1e;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.5rem;
`;

export const TagBox = styled.div`
  background: #1e1e1e;
  border-radius: 0px 0px 16px 16px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const CommentBox = styled.div`
  background: #1e1e1e;
  border-radius: 16px;
  padding: 1.5rem;
  margin-top: 1rem;
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
  object-fit: cover;
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
  padding: 1.5rem 0 0 0;
  justify-content: space-between;
`;

export const InteractionButton = styled.button<{ $isLiked?: boolean; $isSaved?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: ${({ $isLiked }) => ($isLiked ? "#ff4d4d" : "#ffffff")};
  cursor: pointer;
  padding: 1rem 0.5rem;
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: #232323;
    transform: translateY(-2px) scale(1.05);
  }

  svg {
    font-size: 1.5rem;
    transition: all 0.2s ease;
    fill: ${({ $isSaved, $isLiked }) => {
      if ($isSaved) return "#FFD700";
      if ($isLiked) return "#ff3b3b";
      return "none";
    }};
    stroke: ${({ $isSaved, $isLiked }) => {
      if ($isSaved) return "#FFD700";
      if ($isLiked) return "#ff3b3b";
      return "#666";
    }};
    stroke-width: 2;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  span {
    font-size: 1rem;
    font-weight: 500;
    margin-top: 0.25rem;
    letter-spacing: 0.02em;
  }
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