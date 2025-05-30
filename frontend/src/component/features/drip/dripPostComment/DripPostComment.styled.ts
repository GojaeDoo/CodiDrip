import styled from "styled-components";

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

export const CommentContentBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CommentProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid #333;
`;

export const CommentNickname = styled.span`
  font-weight: 600;
  color: #fff;
  font-size: 1rem;
`;

export const CommentText = styled.p`
  color: #e0e0e0;
  font-size: 0.98rem;
  word-break: break-all;
  margin: 0;
`;

export const CommentLikeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 0.2rem;
`;

export const CommentLikeButton = styled.button<{ $isLiked: boolean }>`
  background: none;
  border: none;
  color: #ff4d4d;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;
  font-size: 1.5rem;
  transition: all 0.2s ease;
  font-weight: ${props => props.$isLiked ? 'bold' : 'normal'};
  transform: ${props => props.$isLiked ? 'scale(1.1)' : 'scale(1)'};

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const CommentLikeCount = styled.span<{ $isLiked: boolean }>`
  color: #ff4d4d;
  font-size: 0.95rem;
  font-weight: ${props => props.$isLiked ? 'bold' : 'normal'};
  margin-left: 2px;
`;

export const CommentDate = styled.span`
  color: #888;
  font-size: 0.8rem;
  margin-top: 0.2rem;
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

export const ReplyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #aaa;
  font-size: 0.9rem;

  &:hover {
    color: #fff;
  }
`;

export const ReplyInputWrapper = styled(CommentInputWrapper)`
  margin-left: 52px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const ReplyInput = styled(CommentInput)`
  font-size: 0.9rem;
`;

export const ReplyList = styled.div`
  margin-left: 32px;
  border-left: 2px solid #333;
  padding-left: 16px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ReplyItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 0;
`;

export const ReplyMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ReplyContent = styled.div`
  color: #e0e0e0;
  font-size: 0.98rem;
  margin-left: 44px;
`;

export const ReplyActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 44px;
  margin-top: 2px;
`;

export const ReplyToggleButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9em;
  padding: 4px 8px;
  margin-top: 10px;
  transition: color 0.2s;

  &:hover {
    color: #0056b3;
  }
`;

export const ReplySection = styled.div`
  margin-top: 10px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #888;
  font-size: 0.9em;
`;

export const CommentContent = styled.div`
  color: #fff;
  margin-bottom: 10px;
`;

export const CommentActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const ReplyHeader = styled.div`
`;

export const ReplyActionButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.9em;
  padding: 4px 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: #fff;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  span {
    font-size: 1.1em;
  }
`;

export const HeartIcon = styled.span<{ $isLiked: boolean }>`
  color: #ff4d4d;
  font-size: 1.3em;
  font-weight: ${props => props.$isLiked ? 'bold' : 'normal'};
  transform: ${props => props.$isLiked ? 'scale(1.1)' : 'scale(1)'};
  display: inline-block;
  transition: all 0.2s ease;
`;