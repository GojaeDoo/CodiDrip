import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--background);
  transition: background-color 0.3s ease;
`;

export const FollowWrapper = styled.div`
  width: 100%;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: background-color 0.3s ease;
`;

export const HeaderSection = styled.div`
  width: 100%;
  padding: 2rem;
  background: var(--card-bg);
  border-radius: 10px;
  text-align: center;
  transition: background-color 0.3s ease;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 1rem;
  transition: color 0.3s ease;
`;

export const TabButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  background: ${props => props.$isActive ? 'var(--card-border)' : 'transparent'};
  border: 2px solid var(--card-border);
  color: ${props => props.$isActive ? 'var(--text-primary)' : 'var(--text-secondary)'};
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--card-border);
    color: var(--text-primary);
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
  border-bottom: 1px solid var(--card-border);
  transition: background-color 0.2s ease, border-color 0.3s ease;

  &:hover {
    background: var(--card-border);
  }
`;

export const FollowProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--card-border);
  transition: border-color 0.3s ease;
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
  color: var(--text-primary);
  transition: color 0.3s ease;
`;

export const FollowDetail = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  transition: color 0.3s ease;
`;

export const FollowAbout = styled.div`
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
  line-height: 1.4;
  transition: color 0.3s ease;
`;

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: var(--text-secondary);
  font-size: 1.2rem;
  background: var(--card-bg);
  border-radius: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: var(--text-secondary);
  font-size: 1.2rem;
  background: var(--card-bg);
  border-radius: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
`;
