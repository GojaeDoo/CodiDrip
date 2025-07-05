import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const SkeletonCommentSection = styled.div`
  flex: 1;
  background: var(--card-bg);
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

export const SkeletonCommentBox = styled.div`
  background: var(--card-bg);
  border-radius: 16px;
  padding: 1.5rem;
  margin-top: 1rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const SkeletonCommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const SkeletonCommentProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--card-border);
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonCommentUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
`;

export const SkeletonCommentUserName = styled.div`
  width: 100px;
  height: 16px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonCommentOption = styled.div`
  width: 60px;
  height: 20px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonCommentContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const SkeletonCommentText = styled.div`
  width: 100%;
  height: 16px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
  
  &:nth-child(2) {
    width: 80%;
  }
  
  &:nth-child(3) {
    width: 60%;
  }
`;

export const SkeletonCommentInput = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--card-border);
`;

export const SkeletonCommentInputField = styled.div`
  flex: 1;
  height: 40px;
  background: var(--card-border);
  border-radius: 20px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonCommentSubmitButton = styled.div`
  width: 60px;
  height: 40px;
  background: var(--card-border);
  border-radius: 20px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;
