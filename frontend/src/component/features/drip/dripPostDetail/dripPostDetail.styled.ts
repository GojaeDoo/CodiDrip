import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--background);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  transition: background-color 0.3s ease;
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
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 1.5rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  @media (max-width: 1024px) {
    min-width: 0;
    padding: 1.5rem 0;
    background: none;
    border: none;
  }
`;

export const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background: var(--card-border);
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  transition: background-color 0.3s ease;
`;

export const ProfileBox = styled.div`
  background: var(--card-bg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.5rem;
  transition: background-color 0.3s ease;
`;

export const TagBox = styled.div`
  background: var(--card-bg);
  border-radius: 0px 0px 16px 16px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  transition: background-color 0.3s ease;
`;

export const CommentBox = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 1.5rem;
  margin-top: 1rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
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
  border-bottom: 1px solid var(--card-border);
  transition: border-color 0.3s ease;
`;

export const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--card-border);
  transition: border-color 0.3s ease;
`;

export const UserName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  transition: color 0.3s ease;
`;

export const UserStats = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0.25rem 0 0;
  transition: color 0.3s ease;
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
  color: ${({ $isLiked }) => ($isLiked ? "#ff4d4d" : "var(--text-primary)")};
  cursor: pointer;
  padding: 1rem 0.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--card-border);
    transform: translateY(-2px) scale(1.05);
  }

  svg {
    font-size: 1.5rem;
    transition: all 0.3s ease;
    fill: ${({ $isSaved, $isLiked }) => {
      if ($isSaved) return "#FFD700";
      if ($isLiked) return "#ff3b3b";
      return "none";
    }};
    stroke: ${({ $isSaved, $isLiked }) => {
      if ($isSaved) return "#FFD700";
      if ($isLiked) return "#ff3b3b";
      return "var(--text-secondary)";
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
  background-color: var(--card-border);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--accent);
    color: var(--text-primary);
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
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  color: var(--text-primary);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }
`;

export const ImageCounter = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(4px);
  transition: color 0.3s ease;
`; 