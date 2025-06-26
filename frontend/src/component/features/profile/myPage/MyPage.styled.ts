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

export const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: #1e1e1e;
  border-radius: 10px;
`;

export const ProfileImage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  border: 2px solid #3a3a3a;
  border-radius: 50%;
`;

export const ProfileBar = styled.div`
  border: 1px solid #3a3a3a;
`

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

export const ProfileDetails = styled.div`
  color: #a0a0a0;
  font-size: 1rem;
  margin-top: 0.5rem;
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
  margin-top: 1rem;

  &:hover {
    background-color: #262a2d;
    color: #ffffff;
  }
`;

export const FollowButton = styled.button<{ $isFollowing: boolean }>`
  background: ${props => props.$isFollowing ? '#ff4757' : '#3a3a3a'};
  border: none;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$isFollowing ? '#ff3742' : '#262a2d'};
    color: #ffffff;
  }
`;

export const ContentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const TabButtons = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #3a3a3a;
  padding-bottom: 1rem;
`;

export const TabButton = styled.button<{ 'data-active': boolean }>`
  background: none;
  border: none;
  color: ${props => props['data-active'] ? '#ffffff' : '#a0a0a0'};
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 2px solid ${props => props['data-active'] ? '#ffffff' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AddButton = styled.button`
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
  align-self: flex-end;

  &:hover {
    background-color: #262a2d;
    color: #ffffff;
  }
`;

export const ContentCard = styled.div`
  padding: 1.5rem;
  border-radius: 5px;
  color: #ffffff;
  height: auto;
  border: 1px solid #3a3a3a;
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

// 자유게시판 게시글 목록 컨테이너
export const FreeBoardPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

// 게시글이 없을 때 메시지
export const NoPostsMessage = styled.div`
  text-align: center;
  color: #a0a0a0;
  font-size: 1.1rem;
  padding: 2rem;
`;

// 자유게시판 게시글 아이템
export const FreeBoardPostItem = styled.div`
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #3a3a3a;

  &:hover {
    background: #2a2a2a;
    border-color: #555;
    transform: translateY(-2px);
  }
`;

// 게시글 제목
export const PostTitle = styled.h3`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
`;

// 게시글 내용
export const PostContent = styled.p`
  color: #a0a0a0;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  white-space: normal;
`;

// 게시글 메타 정보
export const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.85rem;
`;

// 게시글 작성일
export const PostDate = styled.span`
  color: #666;
`;

// 게시글 조회수
export const PostViews = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #666;
`;

