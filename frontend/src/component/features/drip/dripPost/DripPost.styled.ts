import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1a1a1a;
  padding: 12px 0;

  @media (max-width: 768px) {
    padding: 6px 0;
  }
`;

export const UserDripPostWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  padding: 0 12px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 0.75rem;
    padding: 0 6px;
  }
`;

export const PostCard = styled.div`
  background: #1e1e1e;
  border: 1px solid #2d2d2d;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 280px;
  max-height: 420px;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 280px;
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
  border-bottom: 1px solid #2d2d2d;
  background: #1e1e1e;

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
  border: 1px solid #2d2d2d;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;

    &:hover {
      transform: none;
    }
  }
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: #e4e6eb;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  background: #000;
  overflow: hidden;
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
  color: #fff;
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
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;

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
  border-bottom: 1px solid #2d2d2d;
  background: #1e1e1e;

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
  color: #e4e6eb;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    color: #b0b3b8;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 3px;

    &:hover {
      transform: none;
    }
  }
`;

export const PostInfo = styled.div`
  padding: 8px 12px;
  background: #1e1e1e;

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
  color: #8ab4f8;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 2px 6px;
  background: #2d2d2d;
  border-radius: 6px;

  &:hover {
    background: #3d3d3d;
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
  color: #e4e6eb;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: color 0.2s;
  &:hover {
    color: #b0b3b8;
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #232323;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: 8px 0;
  z-index: 10;
  min-width: 120px;
  margin-top: 4px;
`;

export const MenuItem = styled.button`
  width: 100%;
  padding: 8px 16px;
  background: none;
  border: none;
  color: #e4e6eb;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #333;
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
  color: #888;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 6px;
  border-radius: 12px;
`;