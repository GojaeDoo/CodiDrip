import styled from "styled-components";

export const SkeletonWrapper = styled.div`
  width: 280px;
  max-height: 420px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: pulse 1.5s infinite;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;

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

export const SkeletonProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--skeleton-start);
  border: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

export const SkeletonUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const SkeletonUsername = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: var(--text-primary);
  transition: color 0.3s ease;
  width: 80px;
  height: 12px;
  background: var(--skeleton-start);
  border-radius: 4px;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 11px;
    width: 70px;
    height: 11px;
  }
`;

export const SkeletonUserStats = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: var(--card-border);
  padding: 2px 6px;
  border-radius: 12px;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 60px;
  height: 16px;
  background: var(--skeleton-start);
  border-radius: 12px;
  transition: background-color 0.3s ease;
`;

export const SkeletonImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  background: var(--card-border);
  overflow: hidden;
  transition: background-color 0.3s ease;
`;

export const SkeletonActions = styled.div`
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

export const SkeletonAction = styled.div`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  width: 50px;
  height: 24px;
  background: var(--skeleton-start);
  border-radius: 4px;
  transition: background-color 0.3s ease;
`;

export const SkeletonPostInfo = styled.div`
  padding: 8px 12px;
  background: var(--card-bg);
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 6px 8px;
  }
`;

export const SkeletonTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;

  @media (max-width: 768px) {
    gap: 3px;
    margin-top: 3px;
  }
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