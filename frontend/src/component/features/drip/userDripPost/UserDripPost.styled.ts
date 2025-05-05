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
  max-width: 400px;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 12px;

  @media (max-width: 768px) {
    gap: 0.75rem;
    padding: 0 6px;
  }
`;

export const PostCard = styled.div`
  background: #1e1e1e;
  border: 1px solid #2d2d2d;
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    border-radius: 8px;
    margin-bottom: 8px;

    &:hover {
      transform: none;
    }
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #2d2d2d;
  background: #1e1e1e;

  @media (max-width: 768px) {
    padding: 8px;
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
  width: 28px;
  height: 28px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #2d2d2d;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    border-radius: 6px;

    &:hover {
      transform: none;
    }
  }
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: 13px;
  color: #e4e6eb;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  background: #000;
  overflow: hidden;

  @media (max-width: 768px) {
    aspect-ratio: 1/1;
  }
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
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #2d2d2d;
  background: #1e1e1e;

  @media (max-width: 768px) {
    padding: 6px 8px;
    gap: 8px;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  color: #e4e6eb;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: #b0b3b8;
    transform: scale(1.1);

    &::after {
      content: "";
      position: absolute;
      bottom: -3px;
      left: 50%;
      transform: translateX(-50%);
      width: 3px;
      height: 3px;
      background: #b0b3b8;
      border-radius: 50%;
    }
  }

  @media (max-width: 768px) {
    padding: 4px;

    &:hover {
      transform: none;

      &::after {
        display: none;
      }
    }
  }
`;

export const PostInfo = styled.div`
  padding: 12px;
  background: #1e1e1e;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;

  @media (max-width: 768px) {
    gap: 4px;
    margin-top: 6px;
  }
`;

export const Tag = styled.span`
  color: #8ab4f8;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 3px 8px;
  background: #2d2d2d;
  border-radius: 8px;

  &:hover {
    background: #3d3d3d;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 6px;

    &:hover {
      transform: none;
    }
  }
`;
