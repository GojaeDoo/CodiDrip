import styled from "styled-components";

export const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #1a1a1a;
  border-radius: 12px;
`;

export const CommentInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: #2a2a2a;
  color: white;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    background: #333;
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Comment = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #2a2a2a;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #333;
  }
`;

export const CommentUserImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background: #333;
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentUserName = styled.span`
  font-weight: 500;
  color: white;
  font-size: 0.9rem;
`;

export const CommentTime = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
`;

export const CommentText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
`;

export const CommentActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
  }

  &.active {
    color: #4caf50;
  }

  &.dislike.active {
    color: #f44336;
  }

  svg {
    font-size: 0.9rem;
  }
`;
