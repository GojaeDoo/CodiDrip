import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 0;
`;

export const FreeBoardDetailWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  background: #1e1e1e;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  
  @media (max-width: 1200px) {
    max-width: 95vw;
    margin: 0 1rem 2rem 1rem;
  }
`;

export const Header = styled.div`
  padding: 3rem 4rem 2rem 4rem;
  border-bottom: 1px solid #333;
  background: linear-gradient(135deg, #1e1e1e 0%, #252525 100%);
  
  @media (max-width: 768px) {
    padding: 2rem 2rem 1.5rem 2rem;
  }
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-size: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  
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
  color: #4a9eff;
  font-weight: 600;
  font-size: 1.1rem;
`;

export const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.95rem;
`;

export const ViewCount = styled.span`
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: "👁️";
    font-size: 0.9rem;
  }
`;

export const Content = styled.div`
  padding: 3rem 4rem;
  flex: 1;
  background: #1e1e1e;
  
  @media (max-width: 768px) {
    padding: 2rem 2rem;
  }
`;

export const PostContent = styled.div`
  color: #e0e0e0;
  font-size: 1.1rem;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
  min-height: 400px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  h1, h2, h3, h4, h5, h6 {
    color: #ffffff;
    margin: 2rem 0 1rem 0;
    font-weight: 600;
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
    border-left: 4px solid #4a9eff;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #ccc;
  }
  
  code {
    background: #2a2a2a;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }
  
  pre {
    background: #2a2a2a;
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 2rem 0;
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
  border-top: 1px solid #333;
  background: #222;
  
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
  background: #333;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #444;
    transform: translateY(-1px);
  }
  
  &::before {
    content: "←";
    font-size: 1.1rem;
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