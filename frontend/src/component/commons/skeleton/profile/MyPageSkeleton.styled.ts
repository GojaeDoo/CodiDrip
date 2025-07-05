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
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--background);
  padding: 40px 0;
  transition: background-color 0.3s ease;
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
  background: var(--card-bg);
  border-radius: 10px;
  border: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;

  @media (max-width: 1024px) {
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    gap: 0.8rem;
  }
`;

export const SkeletonProfileImage = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: var(--card-border);
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;

  @media (max-width: 1024px) {
    width: 240px;
    height: 240px;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

export const SkeletonProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
    text-align: center;
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

export const SkeletonName = styled.div`
  width: 180px;
  height: 32px;
  background: var(--card-border);
  border-radius: 8px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;

  @media (max-width: 1024px) {
    width: 160px;
    height: 30px;
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 28px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 26px;
  }
`;

export const SkeletonStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-top: 0.8rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    margin-top: 0.6rem;
  }
`;

export const SkeletonStat = styled.div`
  width: 80px;
  height: 24px;
  background: var(--card-border);
  border-radius: 8px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    width: 70px;
    height: 22px;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 20px;
  }
`;

export const SkeletonBio = styled.div`
  width: 60%;
  height: 18px;
  background: var(--card-border);
  border-radius: 8px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    width: 80%;
    height: 16px;
  }

  @media (max-width: 480px) {
    width: 90%;
    height: 14px;
  }
`;

export const SkeletonDetails = styled.div`
  width: 40%;
  height: 18px;
  background: var(--card-border);
  border-radius: 8px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    width: 60%;
    height: 16px;
  }

  @media (max-width: 480px) {
    width: 70%;
    height: 14px;
  }
`;

export const SkeletonTabButtons = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid var(--card-border);
  padding-bottom: 1rem;
  transition: border-color 0.3s ease;

  @media (max-width: 1024px) {
    gap: 0.7rem;
    padding-bottom: 0.7rem;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0;
    row-gap: 0.5rem;
    justify-content: center;
    padding-bottom: 0.5rem;
    border-bottom: none;
  }

  @media (max-width: 480px) {
    row-gap: 0.3rem;
    padding-bottom: 0.3rem;
  }
`;

export const SkeletonTab = styled.div`
  width: 120px;
  height: 32px;
  background: var(--card-border);
  border-radius: 8px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: background-color 0.3s ease;

  @media (max-width: 1024px) {
    width: 100px;
    height: 30px;
  }

  @media (max-width: 768px) {
    width: 33.33%;
    height: 28px;
    border-radius: 6px;
  }

  @media (max-width: 480px) {
    height: 26px;
  }
`;

export const SkeletonCard = styled.div`
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: 5px;
  color: var(--text-primary);
  height: 180px;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    margin-top: 1rem;
  }
`;