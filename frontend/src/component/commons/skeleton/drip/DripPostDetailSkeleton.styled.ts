import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const SkeletonBackground = styled.div`
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

export const SkeletonWrapper = styled.div`
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

export const SkeletonMainSection = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SkeletonImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background: var(--card-border);
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  transition: background-color 0.3s ease;
`;

export const SkeletonProfileBox = styled.div`
  background: var(--card-bg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.5rem;
  transition: background-color 0.3s ease;
`;

export const SkeletonTagBox = styled.div`
  background: var(--card-bg);
  border-radius: 0px 0px 16px 16px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  transition: background-color 0.3s ease;
`;

export const SkeletonUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--card-border);
  transition: border-color 0.3s ease;
`;

export const SkeletonProfileImage = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--card-border);
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonUserText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const SkeletonUserName = styled.div`
  width: 120px;
  height: 20px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonUserStats = styled.div`
  width: 80px;
  height: 16px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonInteractionSection = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0 0 0;
  justify-content: space-between;
`;

export const SkeletonInteractionButton = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
`;

export const SkeletonButtonIcon = styled.div`
  width: 24px;
  height: 24px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonButtonText = styled.div`
  width: 60px;
  height: 16px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SkeletonTag = styled.div`
  width: 80px;
  height: 32px;
  background: var(--card-border);
  border-radius: 20px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;


