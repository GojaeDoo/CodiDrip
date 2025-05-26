import styled from "styled-components";

export const CommentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CommentForm = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 12px;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #2d2d2d;
  border-radius: 8px;
  background-color: #2d2d2d;
  color: #ffffff;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #3d3d3d;
  }

  &::placeholder {
    color: #a0a0a0;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background-color: #ff4d4d;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #ff3333;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #3d3d3d;
    cursor: not-allowed;
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 12px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #333;
`;

export const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
`;

export const CommentDate = styled.span`
  font-size: 0.8rem;
  color: #a0a0a0;
`;

export const CommentContent = styled.p`
  font-size: 0.9rem;
  color: #ffffff;
  line-height: 1.5;
  margin: 0;
`;

export const CommentActions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ReplyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: none;
  color: #a0a0a0;
  font-size: 0.8rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

export const RepliesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 2rem;
  padding-left: 1rem;
  border-left: 2px solid #2d2d2d;
`;

export const ReplyItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.8rem;
  background-color: #2d2d2d;
  border-radius: 8px;
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #a0a0a0;
  font-size: 0.9rem;
`;
