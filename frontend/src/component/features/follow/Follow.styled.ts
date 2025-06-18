import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1a1a1a;
  padding: 40px 0;
`;

export const FollowWrapper = styled.div`
  width: 80%;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const HeaderSection = styled.div`
  width: 100%;
  padding: 2rem;
  background: #1e1e1e;
  border-radius: 10px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 1rem;
`;

export const TabButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  background: ${props => props.$isActive ? '#3a3a3a' : 'transparent'};
  border: 2px solid #3a3a3a;
  color: ${props => props.$isActive ? '#ffffff' : '#a0a0a0'};
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #3a3a3a;
    color: #ffffff;
  }
`;

export const ContentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FollowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const FollowItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #1e1e1e;
  border-radius: 10px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #2a2a2a;
  }
`;

export const FollowProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #3a3a3a;
`;

export const FollowInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const FollowName = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffffff;
`;

export const FollowDetail = styled.div`
  font-size: 1rem;
  color: #a0a0a0;
`;

export const FollowAbout = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-top: 0.5rem;
  line-height: 1.4;
`;

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #a0a0a0;
  font-size: 1.2rem;
  background: #1e1e1e;
  border-radius: 10px;
`;

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #a0a0a0;
  font-size: 1.2rem;
  background: #1e1e1e;
  border-radius: 10px;
`;
