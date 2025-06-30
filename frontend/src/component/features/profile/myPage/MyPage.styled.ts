import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--background);
  padding: 40px 0;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px 0;
  }

  @media (max-width: 480px) {
    padding: 15px 0;
  }
`;

export const MyPageWrapper = styled.div`
  width: 80%;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1024px) {
    width: 90%;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 95%;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    width: 98%;
    gap: 0.8rem;
  }
`;

export const ProfileSection = styled.div`
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

export const ProfileImage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  border: 2px solid var(--card-border);
  border-radius: 50%;
  transition: border-color 0.3s ease;

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

export const ProfileBar = styled.div`
  border: 1px solid var(--card-border);
  transition: border-color 0.3s ease;
`;

export const ProfileInfo = styled.div`
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

export const ProfileName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-primary);
  font-family: 'Inter', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: -0.02em;
  transition: color 0.3s ease;

  @media (max-width: 1024px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const ProfileBio = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-family: 'Inter', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  letter-spacing: 0.01em;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

export const ProfileStats = styled.div`
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

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  font-size: 1rem;
  font-family: 'Inter', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    gap: 0.2rem;
  }
`;

export const StatNumber = styled.span`
  font-weight: bold;
  color: var(--text-primary);
  transition: color 0.3s ease;
`;

export const StatLabel = styled.span`
  color: var(--text-secondary);
  transition: color 0.3s ease;
`;

export const ProfileDetails = styled.div`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-top: 0.5rem;
  font-family: 'Inter', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-top: 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-top: 0.3rem;
  }
`;

export const EditButton = styled.button`
  background: var(--card-border);
  height: 40px;
  border: none;
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--accent);
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    margin-top: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.3rem 0.6rem;
    margin-top: 0.6rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
    margin-top: 0.8rem;
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
    margin-top: 0.6rem;
  }
`;

export const LogoutButton = styled.button`
  background: var(--danger);
  border: none;
  height: 40px;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top:1rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.3rem 0.6rem;
    margin-top: 0.6rem;
  }
`;

export const FollowButton = styled.button<{ $isFollowing: boolean }>`
  background: ${props => props.$isFollowing ? 'var(--danger)' : 'var(--card-border)'};
  border: none;
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$isFollowing ? 'var(--danger)' : 'var(--accent)'};
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    margin-top: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.3rem 0.6rem;
    margin-top: 0.6rem;
  }
`;

export const ContentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

export const TabButtons = styled.div`
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

export const TabButton = styled.button<{ 'data-active': boolean }>`
  background: none;
  border: none;
  color: ${props => props['data-active'] ? 'var(--text-primary)' : 'var(--text-secondary)'};
  padding: 0.4rem 0.7rem;
  font-size: 0.95rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  border-bottom: 2px solid ${props => props['data-active'] ? 'var(--accent)' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.5rem;
    gap: 0.2rem;
    width: 33.33%;
    justify-content: center;
    border-bottom: none;
    border-radius: 6px;
    background: ${props => props['data-active'] ? 'var(--card-border)' : 'none'};
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.2rem 0.3rem;
    gap: 0.1rem;
  }
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

export const AddButton = styled.button`
  background: var(--card-border);
  border: none;
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-end;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--accent);
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.3rem 0.6rem;
    gap: 0.2rem;
  }
`;

export const ContentCard = styled.div`
  padding: 1.5rem;
  border-radius: 5px;
  color: var(--text-primary);
  height: auto;
  border: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
  }
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
    background: var(--card-border);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--text-muted);
    border-radius: 4px;
    
    &:hover {
      background: var(--text-secondary);
    }
  }

  @media (max-width: 768px) {
    gap: 1rem;
    padding-bottom: 6px;
  }

  @media (max-width: 480px) {
    gap: 0.8rem;
    padding-bottom: 4px;
  }
`;

// 자유게시판 게시글 목록 컨테이너
export const FreeBoardPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

// 게시글이 없을 때 메시지
export const NoPostsMessage = styled.div`
  text-align: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
  padding: 2rem;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 1rem;
  }
`;

// 자유게시판 게시글 아이템
export const FreeBoardPostItem = styled.div`
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background: var(--card-border);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

// 게시글 제목
export const PostTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 0 0 0.4rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 0 0 0.3rem 0;
  }
`;

// 게시글 내용
export const PostContent = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  white-space: normal;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin: 0 0 0.8rem 0;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin: 0 0 0.6rem 0;
  }
`;

// 게시글 메타 정보
export const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-muted);
  font-size: 0.85rem;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

// 게시글 작성일
export const PostDate = styled.span`
  color: var(--text-muted);
  transition: color 0.3s ease;
`;

// 게시글 조회수
export const PostViews = styled.span`
  color: var(--text-muted);
  transition: color 0.3s ease;
`;

