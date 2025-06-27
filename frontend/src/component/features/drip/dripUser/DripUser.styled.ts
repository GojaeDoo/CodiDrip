import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--background);
  padding: 12px 0;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 6px 0;
  }
`;

export const UserDripWrapper = styled.div`
  width: 100%;
  /* max-width: 1200px; */
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  padding: 0 12px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 0.75rem;
    padding: 0 6px;
  }
`;

export const UserCard = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  width: 280px;
  max-height: 420px;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 280px;
    border-radius: 8px;

    &:hover {
      transform: none;
    }
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 100%;
  height: 280px;
  position: relative;
  overflow: hidden;
  background: var(--card-border);
  transition: background-color 0.3s ease;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${UserCard}:hover & {
    transform: scale(1.05);
  }
`;

export const UserInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Nickname = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  transition: color 0.3s ease;
`;

export const UserStats = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.3s ease;
`;
