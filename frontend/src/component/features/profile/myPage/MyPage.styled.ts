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

export const MyPageWrapper = styled.div`
  width: 80%;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ProfileHeader = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: #1e1e1e;
  border-radius: 10px;
`;

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #3a3a3a;
`;

export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProfileName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
`;

export const ProfileBio = styled.div`
  font-size: 1rem;
  color: #a0a0a0;
  line-height: 1.5;
`;

export const ProfileStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-size: 1rem;
`;

export const StatNumber = styled.span`
  font-weight: bold;
  color: #ffffff;
`;

export const StatLabel = styled.span`
  color: #a0a0a0;
`;

export const EditButton = styled.button`
  background: #3a3a3a;
  border: none;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #262a2d;
    color: #ffffff;
  }
`;

export const ContentSection = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
`;

export const Sidebar = styled.div`
  width: 23%;
  min-width: 220px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 100px;
  align-self: flex-start;
  z-index: 10;
  background: rgba(30, 30, 30, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
  padding: 1.5rem 1rem;
  transition: box-shadow 0.2s, background 0.2s;
`;

export const SidebarItem = styled.div`
  padding: 1rem 1.2rem;
  background: transparent;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.05rem;
  font-weight: 500;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #23272b;
    color: #8ab4f8;
    box-shadow: 0 2px 8px 0 rgba(138,180,248,0.08);
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContentCard = styled.div`
  padding: 1.5rem;
  background: #1e1e1e;
  border-radius: 5px;
  color: #ffffff;
  height: auto;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
`;

export const CardContent = styled.div`
  height: auto;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  gap: 1.5rem;
  padding-bottom: 8px;
  justify-content: flex-start;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #2a2a2a;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
    
    &:hover {
      background: #666;
    }
  }
`;

