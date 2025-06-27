import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--background);
  transition: background-color 0.3s ease;
`;

export const SkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const SkeletonItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--card-bg);
  border-bottom: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const SkeletonProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--card-border);
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const SkeletonName = styled.div`
  width: 120px;
  height: 24px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonDetail = styled.div`
  width: 80px;
  height: 16px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonAbout = styled.div`
  width: 60%;
  height: 14px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;
