import styled from "styled-components";

export const SkeletonWrapper = styled.div`
  width: 280px;
  height: 350px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  animation: pulse 1.5s infinite;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0.6;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 10px 0;
  }
`;

export const SkeletonHeader = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SkeletonProfileImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--skeleton-start);
  transition: background-color 0.3s ease;
`;

export const SkeletonUserInfo = styled.div`
  flex: 1;
`;

export const SkeletonUsername = styled.div`
  width: 120px;
  height: 18px;
  background: var(--skeleton-start);
  border-radius: 4px;
  margin-bottom: 6px;
  transition: background-color 0.3s ease;
`;

export const SkeletonUserStats = styled.div`
  width: 100px;
  height: 16px;
  background: var(--skeleton-start);
  border-radius: 4px;
  transition: background-color 0.3s ease;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: var(--skeleton-start);
  transition: background-color 0.3s ease;
`;

export const SkeletonActions = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
`;

export const SkeletonAction = styled.div`
  width: 24px;
  height: 24px;
  background: var(--skeleton-start);
  border-radius: 4px;
  transition: background-color 0.3s ease;
`;

export const SkeletonTags = styled.div`
  padding: 0 16px 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const SkeletonTag = styled.div`
  width: 60px;
  height: 24px;
  background: var(--skeleton-start);
  border-radius: 4px;
  transition: background-color 0.3s ease;
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`; 