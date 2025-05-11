import styled from "styled-components";

export const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: #1e1e1e;
  border-radius: 8px;
`;

export const CommentInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  background: #1e1e1e;
  color: white;
  font-size: 0.9rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Comment = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
`;

export const CommentUserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const CommentUserName = styled.span`
  font-weight: 600;
  color: white;
  font-size: 0.9rem;
`;

export const CommentText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 0;
`;
