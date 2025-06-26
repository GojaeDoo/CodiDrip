import styled from "styled-components";

export const CommentSection = styled.div`

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    opacity: 0.5;
  }
  
  .empty-text {
    font-size: 1.1rem;
    margin: 0;
    line-height: 1.6;
    font-weight: 500;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const CommentTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
`;

export const CommentCount = styled.span`
  color: #aaa;
  font-size: 0.9rem;
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
  position: relative;
`;

export const UserProfileImage = styled.img<{ $small?: boolean }>`
  width: ${props => props.$small ? '32px' : '40px'};
  height: ${props => props.$small ? '32px' : '40px'};
  border-radius: 50%;
  object-fit: cover;
`;

export const CommentBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const UserName = styled.span`
  font-weight: 600;
  color: #fff;
  font-size: 0.95rem;
`;

export const CommentText = styled.p`
  color: #e0e0e0;
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap;
`;

export const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.2rem;
  position: relative;
`;

export const CommentDate = styled.span`
  color: #aaa;
  font-size: 0.8rem;
`;

export const CommentLikeButton = styled.button<{ $isLiked: boolean }>`
  background: none;
  border: none;
  color: ${props => props.$isLiked ? '#ff4d4d' : '#aaa'};
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    color: #ff4d4d;
  }
`;

export const ReplyButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: #fff;
  }
`;

export const MenuButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Menu = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background: #232323;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  min-width: 100px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0;
`;

export const MenuItem = styled.button`
  background: none;
  border: none;
  color: #fff;
  padding: 0.7rem 1.2rem;
  text-align: left;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #333;
  }
`;

export const ReplyForm = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.8rem;
  margin-left: 3.2rem;
`;

export const ReplyInput = styled.input`
  flex: 1;
  padding: 0.6rem 0.8rem;
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

export const ReplyList = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReplyItem = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 0.3rem 0;
  position: relative;
`;

export const ShowRepliesButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  transition: color 0.2s ease;
  display: flex;
  justify-content: flex-start;

  &:hover {
    color: #fff;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #232323;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  padding: 1.5rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #fff;
  }
`;

export const ModalBody = styled.div`
  margin-bottom: 1rem;
`;

export const ModalTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.8rem;
  border: 1px solid #2d2d2d;
  border-radius: 8px;
  background-color: #2d2d2d;
  color: #ffffff;
  font-size: 0.95rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3d3d3d;
  }

  &::placeholder {
    color: #a0a0a0;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
`;

export const ModalButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:first-child {
    background: #3d3d3d;
    color: #fff;

  &:hover {
      background: #4d4d4d;
    }
  }

  &:last-child {
    background: #ff4d4d;
    color: #fff;

    &:hover {
      background: #ff6666;
  }
  }
`;
