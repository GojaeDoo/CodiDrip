import styled, { keyframes } from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

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

export const DripPostDetailWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  padding: 0 12px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    gap: 0.75rem;
    padding: 0 6px;
  }
`;

export const PostContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  background: #1e1e1e;
  border-radius: 16px;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export const ImageSection = styled.div`
  flex: 1;
  position: relative;
  min-height: 400px;
  background: #333;
  border-radius: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.01);
  }
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #333;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export const ImageNavigation = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageSection}:hover & {
    opacity: 1;
  }
`;

export const NavButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);

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
  transition: transform 0.3s ease;
`;

export const StyledChevronRight = styled(ChevronRight)`
  color: white;
  transition: transform 0.3s ease;
`;

export const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const UserName = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const InteractionSection = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const InteractionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  span {
    font-size: 0.9rem;
  }
`;

export const TagSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #888;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: #ddd;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 12px;
`;

export const CommentInput = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Comment = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

export const CommentUserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const CommentUserName = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
`;

export const CommentText = styled.p`
  font-size: 0.9rem;
  color: #ddd;
  margin: 0;
  line-height: 1.4;
`;
