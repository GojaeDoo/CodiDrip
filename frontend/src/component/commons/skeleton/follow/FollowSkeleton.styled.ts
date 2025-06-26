import styled from "styled-components";

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
  background: #1e1e1e;
  border-radius: 10px;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 0.8; }
    100% { opacity: 0.6; }
  }
`;

export const SkeletonProfile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #2d2d2d;
`;

export const SkeletonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const SkeletonName = styled.div`
  width: 160px;
  height: 22px;
  background: #2d2d2d;
  border-radius: 6px;
`;

export const SkeletonDetail = styled.div`
  width: 120px;
  height: 16px;
  background: #2d2d2d;
  border-radius: 6px;
`;

export const SkeletonAbout = styled.div`
  width: 80%;
  height: 14px;
  background: #2d2d2d;
  border-radius: 6px;
  margin-top: 0.5rem;
`;
