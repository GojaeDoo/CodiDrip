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
  background: var(--background);
  padding: 20px;
  transition: background-color 0.3s ease;
`;

export const SkeletonWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: var(--card-bg);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 0;
    box-shadow: none;
  }
`;

export const SkeletonHeader = styled.div`
  background: var(--card-bg);
  padding: 32px;
  text-align: center;
  border-bottom: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  @media (max-width: 768px) {
    padding: 16px 8px;
  }
`;

export const SkeletonTitle = styled.div`
  width: 200px;
  height: 32px;
  background: var(--card-border);
  margin: 0 auto 8px auto;
  border-radius: 8px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonSubtitle = styled.div`
  width: 150px;
  height: 16px;
  background: var(--card-border);
  margin: 0 auto;
  border-radius: 8px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonContent = styled.div`
  padding: 32px;
  @media (max-width: 768px) {
    padding: 12px 4px;
  }
`;

export const SkeletonTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--card-border);
  transition: border-color 0.3s ease;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }
`;

export const SkeletonSearchContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    gap: 4px;
  }
`;

export const SkeletonSearchInput = styled.div`
  width: 300px;
  height: 40px;
  background: var(--card-border);
  border-radius: 8px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    width: 100%;
    height: 28px;
  }
`;

export const SkeletonSearchButton = styled.div`
  width: 80px;
  height: 40px;
  background: var(--card-border);
  border-radius: 8px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    width: 60px;
    height: 28px;
  }
`;

export const SkeletonWriteButton = styled.div`
  width: 100px;
  height: 40px;
  background: var(--card-border);
  border-radius: 8px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    width: 100%;
    height: 28px;
    margin-top: 4px;
  }
`;

export const SkeletonTable = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  @media (max-width: 768px) {
    border-radius: 6px;
  }
`;

export const SkeletonTableHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px 100px;
  gap: 16px;
  padding: 16px 24px;
  background: var(--card-border);
  border-bottom: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SkeletonHeaderCell = styled.div`
  height: 20px;
  background: var(--card-bg);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonTableRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px 100px;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--card-border);
  transition: border-color 0.3s ease;
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 14px 8px;
    background: var(--card-bg);
    border-radius: 8px;
    margin-bottom: 10px;
    border: none;
  }
`;

export const SkeletonCell = styled.div`
  height: 16px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    height: 14px;
  }
`;

// FreeBoardSkeleton.tsx에서 사용하는 컴포넌트들
export const SkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: var(--card-bg);
  border-bottom: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const SkeletonMeta = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const SkeletonDate = styled.div`
  width: 80px;
  height: 16px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;

export const SkeletonViews = styled.div`
  width: 60px;
  height: 16px;
  background: var(--card-border);
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;
`;
