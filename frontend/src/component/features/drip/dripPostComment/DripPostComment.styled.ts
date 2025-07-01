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
  color: var(--text-secondary);
  transition: color 0.3s ease;
  
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
  color: var(--text-primary);
  transition: color 0.3s ease;
`;

export const CommentCount = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: color 0.3s ease;
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
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: color 0.3s ease;
`;

export const CommentText = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap;
  transition: color 0.3s ease;
`;

export const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.2rem;
  position: relative;
`;

export const CommentDate = styled.span`
  color: var(--text-muted);
  font-size: 0.8rem;
  transition: color 0.3s ease;
`;

export const CommentLikeButton = styled.button<{ $isLiked: boolean }>`
  background: none;
  border: none;
  color: ${props => props.$isLiked ? '#ff4d4d' : 'var(--text-muted)'};
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ff4d4d;
  }
`;

export const ReplyButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-primary);
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
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  min-width: 100px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const MenuItem = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  padding: 0.7rem 1.2rem;
  text-align: left;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: var(--card-border);
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
  border: 1px solid var(--card-border);
  border-radius: 8px;
  background-color: var(--card-border);
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  &::placeholder {
    color: var(--text-muted);
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
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  transition: color 0.3s ease;
  display: flex;
  justify-content: flex-start;

  &:hover {
    color: var(--text-primary);
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
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  padding: 1.5rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
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
  color: var(--text-primary);
  transition: color 0.3s ease;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-primary);
  }
`;

export const ModalBody = styled.div`
  margin-bottom: 1rem;
`;

export const ModalTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.8rem;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  background-color: var(--card-border);
  color: var(--text-primary);
  font-size: 0.95rem;
  resize: vertical;
  transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  &::placeholder {
    color: var(--text-muted);
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
  transition: all 0.3s ease;

  &:first-child {
    background: var(--card-border);
    color: var(--text-primary);

  }

  &:last-child {
    background-color: var(--button-bg);
    color: var(--button-text);

    &:hover {
    background-color: var(--button-hover);
    border-color: var(--button-hover);
    color: var(--button-text);
  }
  }
`;

export const ReportModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ReportModalContent = styled.div`
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
`;

export const ReportModalTitle = styled.h2`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
  transition: color 0.3s ease;
`;

export const ReportModalText = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.5;
  transition: color 0.3s ease;
`;

export const ReportReasonSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  background-color: var(--card-bg);
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  option {
    background-color: var(--card-bg);
    color: var(--text-primary);
  }
`;

export const ReportModalButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const ReportModalButton = styled.button<{ $primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${({ $primary }) => ($primary ? 'var(--accent)' : 'var(--card-border)')};
  color: var(--text-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ $primary }) => ($primary ? 'var(--accent-hover)' : 'var(--card-border)')};
  }

  &:disabled {
    background-color: var(--card-border);
    color: var(--text-secondary);
    cursor: not-allowed;
  }
`;
