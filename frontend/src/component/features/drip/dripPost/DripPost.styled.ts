import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; // center에서 flex-start로 변경
  padding: 12px 0;
  background-color: var(--background);
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 6px 0;
  }
`;

export const UserDripPostWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1.91rem;
  padding: 0 12px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: var(--background);
  transition: background-color 0.3s ease;
  
  & > * {
    flex: 0 0 280px;
    min-width: 280px;
  }

  @media (max-width: 768px) {
    gap: 0.75rem;
    padding: 0 6px;
    flex-wrap: wrap;
    
    & > * {
      flex: 0 0 100%;
      min-width: 100%;
    }
  }
`;

export const PostCard = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  width: 280px; // 원래 크기 유지
  max-height: 420px;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;

  &:hover {
    border-color: var(--accent-color);
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 8px;

    &:hover {
      transform: none;
    }
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-bg);
  transition: background-color 0.3s ease, border-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 6px 8px;
  }
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 6px;

  }
`;

export const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--card-border);
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;

    &:hover {
      transform: none;
    }
  }

  cursor: pointer;
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: var(--text-primary);
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  background: var(--card-border);
  overflow: hidden;
  transition: background-color 0.3s ease;
`;

export const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    &:hover {
      transform: none;
    }
  }
`;

export const NavigationButton = styled.button<{ $position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.$position === "left" ? "left: 8px;" : "right: 8px;")}
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-primary);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    ${(props) => (props.$position === "left" ? "left: 6px;" : "right: 6px;")}

    &:hover {
      transform: translateY(-50%);
    }
  }
`;

export const ImageCounter = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: var(--text-primary);
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    top: 6px;
    right: 6px;
    padding: 2px 4px;
    font-size: 10px;
    border-radius: 8px;
  }
`;

export const PostActions = styled.div`
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-bg);
  transition: background-color 0.3s ease, border-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 4px 8px;
    gap: 6px;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;

  span {
    font-size: 12px;
    color: var(--text-secondary);
  }

  &:hover {
    color: var(--text-secondary);
    transform: scale(1.1);

    span {
      color: var(--text-primary);
    }
  }

  @media (max-width: 768px) {
    padding: 3px;
    gap: 3px;

    span {
      font-size: 11px;
    }

    &:hover {
      transform: none;
    }
  }
`;

export const PostInfo = styled.div`
  padding: 8px 12px;
  background: var(--card-bg);
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 6px 8px;
  }
`;

export const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;

  @media (max-width: 768px) {
    gap: 3px;
    margin-top: 3px;
  }
`;

export const Tag = styled.span`
  color: var(--text-primary);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 2px 6px;
  background: var(--card-border);
  border-radius: 6px;

  &:hover {
    background: var(--accent-hover);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 4px;

    &:hover {
      transform: none;
    }
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--text-secondary);
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: 8px 0;
  z-index: 10;
  min-width: 120px;
  margin-top: 4px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const MenuItem = styled.button`
  width: 100%;
  padding: 8px 16px;
  background: none;
  border: none;
  color: var(--text-primary);
  text-align: left;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  
  &:hover {
    background: var(--card-border);
  }
`;

export const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const UserStats = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: var(--card-border);
  padding: 2px 6px;
  border-radius: 12px;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export const PostFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PostFooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LikeButton = styled.button<{ $isLiked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: var(--text-primary);

  span {
    font-size: 12px;
    color: var(--text-secondary);
  }

  svg {
    fill: ${({ $isLiked }) => ($isLiked ? "#ff3b3b" : "none")};
    stroke: ${({ $isLiked }) => ($isLiked ? "#ff3b3b" : "var(--text-secondary)")};
    stroke-width: 2;
  }

  &:hover {
    background-color: var(--card-border);
    transform: scale(1.1);

    span {
      color: var(--text-primary);
    }
  }

  @media (max-width: 768px) {
    padding: 0.3rem;
    gap: 0.3rem;

    span {
      font-size: 11px;
    }

    &:hover {
      transform: none;
    }
  }
`;

export const ReportModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ReportModalContent = styled.div`
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
`;

export const ReportModalTitle = styled.h2`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
  transition: color 0.3s ease;
`;

export const ReportModalText = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.5;
  transition: color 0.3s ease;
`;

export const ReportReasonSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  background-color: var(--card-bg);
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  option {
    background-color: var(--card-bg);
    color: var(--text-primary);
  }
`;

export const ReportModalButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const ReportModalButton = styled.button<{ $primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${({ $primary }) => ($primary ? 'var(--accent)' : 'var(--card-border)')};
  color: var(--text-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ $primary }) => ($primary ? 'var(--accent-hover)' : 'var(--card-border)')};
  }

  &:disabled {
    background-color: var(--card-border);
    color: var(--text-secondary);
    cursor: not-allowed;
  }
`;