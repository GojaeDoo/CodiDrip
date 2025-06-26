import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const SkeletonWrapper = styled.div`
  padding: 32px;
  @media (max-width: 768px) {
    padding: 12px 4px;
  }
`;

export const SkeletonRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px 100px;
  gap: 16px;
  padding: 16px 24px;
  margin-bottom: 8px;
  background: #232323;
  border-radius: 8px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 8px;
  }
`;

export const SkeletonBox = styled.div`
  height: 18px;
  border-radius: 4px;
  background: linear-gradient(90deg, #222 25%, #333 50%, #222 75%);
  background-size: 400px 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;
