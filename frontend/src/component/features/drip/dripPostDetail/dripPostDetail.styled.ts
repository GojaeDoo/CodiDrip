import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Background = styled.div`
  min-height: 100vh;
  background: #1a1a1a;
  padding: 1rem 0;

  @media (min-width: 768px) {
    padding: 2rem 0;
  }
`;

export const DripPostDetailWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    flex-direction: row;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

export const ImageSection = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: #333;
  overflow: hidden;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

export const ImageNavigation = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  pointer-events: none;

  @media (min-width: 768px) {
    padding: 0 1rem;
  }
`;

export const NavButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
  pointer-events: auto;
  backdrop-filter: blur(4px);

  @media (min-width: 768px) {
    width: 44px;
    height: 44px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const StyledChevronLeft = styled(ChevronLeft)`
  color: white;
  width: 20px;
  height: 20px;

  @media (min-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

export const StyledChevronRight = styled(ChevronRight)`
  color: white;
  width: 20px;
  height: 20px;

  @media (min-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

export const ImageCounter = styled.div`
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 16px;
  font-size: 0.8rem;
  backdrop-filter: blur(4px);

  @media (min-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

export const ContentSection = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #1e1e1e;
  width: 100%;

  @media (min-width: 768px) {
    padding: 2rem;
    gap: 2rem;
    width: 50%;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 768px) {
    gap: 1rem;
    padding-bottom: 1.5rem;
  }
`;

export const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  background: #333;
  border: 2px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 768px) {
    width: 52px;
    height: 52px;
  }
`;

export const UserName = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  display: block;
  margin-bottom: 0.2rem;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
  }
`;

export const UserStats = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const InteractionSection = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 768px) {
    gap: 2rem;
    padding: 1rem 0;
  }
`;

export const InteractionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  transition: all 0.2s ease;

  @media (min-width: 768px) {
    gap: 0.6rem;
    font-size: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 12px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 20px;
    height: 20px;

    @media (min-width: 768px) {
      width: 22px;
      height: 22px;
    }
  }
`;

export const TagSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 768px) {
    gap: 1rem;
    padding: 1rem 0;
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (min-width: 768px) {
    gap: 0.6rem;
  }
`;

export const Tag = styled.span`
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.4rem 0.8rem;
  border-radius: 16px;
  font-size: 0.85rem;
  transition: all 0.2s ease;

  @media (min-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    border-radius: 20px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
