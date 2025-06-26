import styled from "styled-components";

export const SkeletonBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1a1a1a;
  padding: 40px 0;
`;

export const SkeletonWrapper = styled.div`
  width: 80%;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SkeletonProfileSection = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: #1e1e1e;
  border-radius: 10px;
`;

export const SkeletonProfileImage = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: #2d2d2d;
`;

export const SkeletonProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SkeletonName = styled.div`
  width: 180px;
  height: 32px;
  background: #2d2d2d;
  border-radius: 8px;
`;

export const SkeletonStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;

export const SkeletonStat = styled.div`
  width: 80px;
  height: 24px;
  background: #2d2d2d;
  border-radius: 8px;
`;

export const SkeletonBio = styled.div`
  width: 60%;
  height: 18px;
  background: #2d2d2d;
  border-radius: 8px;
`;

export const SkeletonDetails = styled.div`
  width: 40%;
  height: 18px;
  background: #2d2d2d;
  border-radius: 8px;
`;

export const SkeletonTabButtons = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #3a3a3a;
  padding-bottom: 1rem;
`;

export const SkeletonTab = styled.div`
  width: 120px;
  height: 32px;
  background: #2d2d2d;
  border-radius: 8px;
`;

export const SkeletonCard = styled.div`
  padding: 1.5rem;
  background: #1e1e1e;
  border-radius: 5px;
  color: #ffffff;
  height: 180px;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
