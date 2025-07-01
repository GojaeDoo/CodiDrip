import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  background: var(--background);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0;
  transition: background-color 0.3s ease;
`;

export const FreeBoardCommentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  background: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
  
  @media (max-width: 1200px) {
    max-width: 95vw;
    margin: 0 1rem;
  }
`;

export const CommentHeader = styled.div`
  padding: 2.5rem 4rem 1.5rem 4rem;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 2rem 2rem 1rem 2rem;
  }
  
  h2 {
    color: var(--text-primary);
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0;
    letter-spacing: -0.01em;
    transition: color 0.3s ease;
  }
  
  .comment-count {
    color: var(--text-secondary);
    font-size: 1rem;
    margin-top: 0.75rem;
    font-weight: 500;
    transition: color 0.3s ease;
  }
`;

export const CommentList = styled.div`
  padding: 1.5rem 4rem;
  background: var(--card-bg);
  transition: background-color 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;

export const CommentItem = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid var(--card-border);
  transition: border-color 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:first-child {
    padding-top: 0;
  }
`;

export const CommentHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;

export const UserInfo = styled.div`
  flex: 1;
  
  .username {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 1.1rem;
    margin: 0;
    letter-spacing: -0.01em;
    transition: color 0.3s ease;
  }
  
  .timestamp {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin: 0.25rem 0 0 0;
    font-weight: 500;
    transition: color 0.3s ease;
  }
`;

export const CommentActions = styled.div`
  display: flex;
  gap: 1rem;
  
  button {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    transition: all 0.2s ease;
    font-weight: 500;
    
    &:hover {
      background: var(--card-border);
      color: var(--text-primary);
      transform: translateY(-1px);
    }
  }
`;

export const CommentContent = styled.div`
  color: var(--text-primary);
  line-height: 1.7;
  font-size: 1rem;
  margin-left: 4rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: color 0.3s ease;
  
  @media (max-width: 768px) {
    margin-left: 3rem;
  }
`;

export const CommentForm = styled.div`
  padding: 2rem;
  border-top: 1px solid var(--card-border);
  background: var(--card-bg);
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  background: var(--card-border);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1.25rem;
  color: var(--text-primary);
  font-size: 1rem;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &::placeholder {
    color: var(--text-muted);
  }
  
  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const CommentSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;
  
  button {
    background: var(--accent);
    color: white;
    border: none;
    padding: 0.875rem 2rem;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 1rem;
    
    &:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  }
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

// 모달 관련 스타일
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

export const ModalContent = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
  border: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  
  @media (max-width: 600px) {
    width: 95%;
    padding: 2rem;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--card-border);
  transition: border-color 0.3s ease;
  
  h3 {
    color: var(--text-primary);
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    letter-spacing: -0.01em;
    transition: color 0.3s ease;
  }
  
  .close-button {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 1.75rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:hover {
      background: var(--card-border);
      color: var(--text-primary);
      transform: scale(1.1);
    }
  }
`;

export const ModalBody = styled.div`
  margin-bottom: 2rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  
  button {
    padding: 0.875rem 2rem;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    font-size: 1rem;
    
    &.cancel {
      background: var(--card-border);
      color: var(--text-secondary);
      
      &:hover {
        background: var(--text-muted);
        color: var(--text-primary);
        transform: translateY(-1px);
      }
    }
    
    &.submit {
      background: var(--button-bg);
      color: var(--button-text);
      
      &:hover {
        background-color: var(--button-hover);
        border-color: var(--button-hover);
        color: var(--button-text);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    }
  }
`;

export const AddCommentButton = styled.button`
  background-color: var(--button-bg);
  color: var(--button-text);
  border: none;
  padding: 1rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 2rem 0;
  
  &:hover {
    background-color: var(--button-hover);
    border-color: var(--button-hover);
    color: var(--button-text);
  }
`;

export const ShowMoreButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: #667eea;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 1rem 4rem;
  transition: all 0.2s ease;
  border-top: 1px solid #333;
  
  &:hover {
    background: #252525;
    color: #8b9eff;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;

// 대댓글 wrapper
export const ReplyWrapper = styled.div`
  margin-left: 3rem;
  padding: 1rem;
`;

// 대댓글 컨테이너
export const ReplyContainer = styled.div`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// 대댓글 아바타
export const ReplyAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0.75rem;
`;

// 대댓글 상단(닉네임, 시간, 버튼)
export const ReplyHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

// 대댓글 수정/삭제 버튼
export const ReplyActionButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 12px;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-weight: 500;
  
  &:first-child {
    color: #667eea;
    
    &:hover {
      background: rgba(102, 126, 234, 0.1);
      color: #8b9eff;
    }
  }
  
  &:last-child {
    color: #e74c3c;
    margin-right: 0;
    
    &:hover {
      background: rgba(231, 76, 60, 0.1);
      color: #ff6b6b;
    }
  }
`;

// 댓글/대댓글 입력창 wrapper
export const EditInputWrapper = styled.div`
  margin-left: 3.5rem;
  margin-top: 1rem;
`;

// 버튼 그룹 wrapper
export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

// 저장/취소 버튼
export const SaveButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

export const CancelButton = styled.button`
  background: #444;
  color: #ccc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #555;
    color: #fff;
    transform: translateY(-1px);
  }
`;

// 대댓글 보기/숨기기 버튼
export const ToggleReplyButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: all 0.2s ease;
  
  &:hover {
    color: #8b9eff;
    text-decoration: underline;
  }
`;

// 대댓글 없음 메시지
export const NoReply = styled.div`
  margin-left: 3.5rem;
  margin-top: 1rem;
  color: var(--text-muted);
  font-size: 14px;
  font-style: italic;
  padding: 1rem;
  background: var(--card-border);
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

// 대댓글 입력 UI wrapper
export const ReplyInputWrapper = styled.div`
  margin-left: 3.5rem;
  margin-top: 1rem;
  padding: 1rem;
  background: var(--card-border);
  border-radius: 12px;
  transition: background-color 0.3s ease;
`;

// 대댓글 입력창
export const ReplyInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  background: var(--background);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 1rem;
  color: var(--text-primary);
  font-size: 14px;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &::placeholder {
    color: var(--text-muted);
  }
  
  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

// 대댓글 버튼 그룹
export const ReplyButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  justify-content: flex-end;
`;

// 대댓글 작성/취소 버튼
export const ReplySubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ReplyCancelButton = styled.button`
  background: #444;
  color: #ccc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #555;
    color: #fff;
    transform: translateY(-1px);
  }
`;

// 대댓글 수정 UI wrapper
export const ReplyEditWrapper = styled.div`
  margin-left: 3.5rem;
  margin-top: 1rem;
  padding: 1rem;
  background: var(--card-border);
  border-radius: 12px;
  transition: background-color 0.3s ease;
`;

// 대댓글 수정 입력창
export const ReplyEditInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  background: var(--background);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 1rem;
  color: var(--text-primary);
  font-size: 14px;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &::placeholder {
    color: var(--text-muted);
  }
  
  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

// 대댓글 수정 버튼 그룹
export const ReplyEditButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  justify-content: flex-end;
`;

// 대댓글 수정 저장/취소 버튼
export const ReplyEditSaveButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ReplyEditCancelButton = styled.button`
  background: #444;
  color: #ccc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #555;
    color: #fff;
    transform: translateY(-1px);
  }
`;

// 신고 모달 스타일
export const ReportModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

export const ReportModalContent = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
  border: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  
  @media (max-width: 600px) {
    width: 95%;
    padding: 2rem;
  }
`;

export const ReportModalTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
`;

export const ReportModalText = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  transition: color 0.3s ease;
`;

export const ReportReasonSelect = styled.select`
  width: 100%;
  padding: 1rem;
  background: var(--background);
  border: 1px solid var(--card-border);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;
  margin-bottom: 2rem;
  
  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  option {
    background: var(--card-bg);
    color: var(--text-primary);
  }
`;

export const ReportModalButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
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