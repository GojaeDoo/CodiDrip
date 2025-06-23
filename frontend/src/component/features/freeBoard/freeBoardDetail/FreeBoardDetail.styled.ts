import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  background: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 0;
`;

export const FreeBoardDetailWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  background: #1a1a1a;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    max-width: 100vw;
    border-radius: 0;
  }
`;

export const Header = styled.div`
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid #333;
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  line-height: 1.3;
`;

export const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Author = styled.span`
  color: #4a9eff;
  font-weight: 600;
`;

export const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ViewCount = styled.span`
  color: #666;
`;

export const Content = styled.div`
  padding: 2rem;
  flex: 1;
`;

export const PostContent = styled.div`
  color: #e0e0e0;
  font-size: 1rem;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
  min-height: 300px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-top: 1px solid #333;
  background: #222;
`;

export const LeftButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const RightButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #333;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #444;
  }
`;

export const EditButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #4a9eff;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #3a8eef;
  }
`;

export const DeleteButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #e74c3c;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #c0392b;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: #ffffff;
  font-size: 1.1rem;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: #e74c3c;
  font-size: 1.1rem;
  gap: 1rem;
`;

export const ErrorMessage = styled.p`
  margin: 0;
  color: #888;
`;