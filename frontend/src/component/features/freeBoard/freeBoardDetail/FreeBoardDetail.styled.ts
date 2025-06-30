import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  background: var(--background);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 0;
  transition: background-color 0.3s ease;
`;

export const FreeBoardDetailWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  background: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  transition: background-color 0.3s ease;
  
  @media (max-width: 1200px) {
    max-width: 95vw;
    margin: 0 1rem 2rem 1rem;
  }
`;

export const Header = styled.div`
  padding: 3rem 4rem 2rem 4rem;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-bg);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 2rem 2rem 1.5rem 2rem;
  }
`;

export const Title = styled.h1`
  color: var(--text-primary);
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  transition: color 0.3s ease;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
`;

export const Author = styled.span`
  color: var(--accent);
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.3s ease;
`;

export const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.95rem;
`;

export const ViewCount = styled.span`
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
  
  &::before {
    content: "👁️";
    font-size: 0.9rem;
  }
`;

export const Content = styled.div`
  padding: 3rem 4rem;
  flex: 1;
  background: var(--card-bg);
  transition: background-color 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 2rem 2rem;
  }
`;

export const PostContent = styled.div`
  color: var(--text-primary);
  font-size: 1.1rem;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
  min-height: 400px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: color 0.3s ease;
  
  h1, h2, h3, h4, h5, h6 {
    color: var(--text-primary);
    margin: 2rem 0 1rem 0;
    font-weight: 600;
    transition: color 0.3s ease;
  }
  
  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
  
  p {
    margin: 1.5rem 0;
  }
  
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin: 0.5rem 0;
  }
  
  blockquote {
    border-left: 4px solid var(--accent);
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: var(--text-secondary);
    transition: border-color 0.3s ease, color 0.3s ease;
  }
  
  code {
    background: var(--card-border);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }
  
  pre {
    background: var(--card-border);
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 2rem 0;
    transition: background-color 0.3s ease;
  }
  
  pre code {
    background: none;
    padding: 0;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  border-top: 1px solid var(--card-border);
  background: var(--card-bg);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    flex-direction: column;
    gap: 1rem;
  }
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
  padding: 0.875rem 1.75rem;
  background: var(--card-border);
  border: none;
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--accent);
    transform: translateY(-1px);
  }
`;

export const EditButton = styled.button`
  padding: 0.875rem 1.75rem;
  background: #4a9eff;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #3a8eef;
    transform: translateY(-1px);
  }
`;

export const DeleteButton = styled.button`
  padding: 0.875rem 1.75rem;
  background: #e74c3c;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c0392b;
    transform: translateY(-1px);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 500;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  color: #e74c3c;
  font-size: 1.2rem;
  gap: 1.5rem;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  margin: 0;
  color: #888;
  font-size: 1rem;
  max-width: 400px;
  line-height: 1.6;
`;

export const ReportButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: #c0392b;
    transform: translateY(-1px);
  }
`;

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