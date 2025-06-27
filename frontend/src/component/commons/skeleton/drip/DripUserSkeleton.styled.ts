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
  padding: 12px 0;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 6px 0;
  }
`;

export const UserDripWrapper = styled.div`
  width: 100%;
  /* max-width: 1200px; */
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  padding: 0 12px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 0.75rem;
    padding: 0 6px;
  }
`;

export const UserCard = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 280px;
  max-height: 420px;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  @media (max-width: 768px) {
    width: 280px;
    border-radius: 8px;
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 100%;
  height: 280px;
  position: relative;
  overflow: hidden;
  background: var(--card-border);
  transition: background-color 0.3s ease;
`;

export const ProfileImageSkeleton = styled.div`
  width: 100%;
  height: 100%;
  background: var(--card-border);
  transition: background-color 0.3s ease;
`;

export const UserInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NicknameSkeleton = styled.div`
  width: 120px;
  height: 18px;
  background: var(--card-border);
  border-radius: 4px;
  margin-bottom: 6px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const UserStatsSkeleton = styled.div`
  width: 100px;
  height: 16px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;
