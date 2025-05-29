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
  border-radius: 12px;
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
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
  background-color: #000000;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #262a2d;
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
  gap: 1.25rem;
`;

export const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #393939;
`;

export const CommentProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid #333;
`;

export const CommentContentBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CommentNickname = styled.span`
  font-weight: 600;
  color: #fff;
  font-size: 1rem;
`;

export const CommentText = styled.span`
  color: #e0e0e0;
  font-size: 0.98rem;
  word-break: break-all;
`;

export const CommentDate = styled.span`
  color: #888;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

export const CommentLikeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.2rem;
`;

export const CommentLikeButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4d;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;
  font-size: 1.1rem;
  transition: transform 0.1s;
  &:hover {
    transform: scale(1.15);
  }
`;

export const CommentLikeCount = styled.span`
  color: #ff4d4d;
  font-size: 0.95rem;
  font-weight: 500;
`;

export const CommentMenuWrapper = styled.div`
  position: relative;
  margin-left: auto;
`;

export const CommentMenuButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
`;

export const CommentMenu = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background: #232323;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  min-width: 80px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0;
`;

export const CommentMenuItem = styled.button`
  background: none;
  border: none;
  color: #fff;
  padding: 0.7rem 1.2rem;
  text-align: left;
  font-size: 0.98rem;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #333;
  }
`; 