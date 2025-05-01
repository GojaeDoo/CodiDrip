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
  max-width: 1200px;
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
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SidebarItem = styled.div`
  padding: 1rem;
  background: #1e1e1e;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #262a2d;
    color: #ffffff;
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
  color: #a0a0a0;
  line-height: 1.5;
`;
