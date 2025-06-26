import styled from "styled-components";

export const SkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const SkeletonItem = styled.div`
  background: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 0.8; }
    100% { opacity: 0.6; }
  }
`;

export const SkeletonTitle = styled.div`
  width: 40%;
  height: 22px;
  background: #2d2d2d;
  border-radius: 6px;
`;

export const SkeletonContent = styled.div`
  width: 100%;
  height: 16px;
  background: #2d2d2d;
  border-radius: 6px;
  margin-bottom: 6px;
`;

export const SkeletonMeta = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const SkeletonDate = styled.div`
  width: 80px;
  height: 14px;
  background: #2d2d2d;
  border-radius: 6px;
`;

export const SkeletonViews = styled.div`
  width: 40px;
  height: 14px;
  background: #2d2d2d;
  border-radius: 6px;
`;
