import styled, { createGlobalStyle } from "styled-components";

export const ReportListGlobalStyle = createGlobalStyle`
  .pc-only { display: block; }
  .mobile-only { display: none; }
  @media (max-width: 768px) {
    .pc-only { display: none !important; }
    .mobile-only { display: flex !important; }
  }
`;

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--background);
  padding: 20px;
  transition: background-color 0.3s ease;
`;

export const ReportListWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: var(--card-bg);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 0;
    box-shadow: none;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid var(--border-color);
  
  h1 {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }
`;

export const RefreshButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--primary-hover);
  }
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--card-bg);
`;

export const TabButton = styled.button<{ active: string }>`
  flex: 1;
  padding: 16px 24px;
  background-color: ${props => props.active === 'true' ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active === 'true' ? 'white' : 'var(--text-secondary)'};
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active === 'true' ? 'var(--primary-hover)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  padding: 16px 32px;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--card-bg);
`;

export const FilterButton = styled.button<{ active: string }>`
  padding: 8px 16px;
  background-color: ${props => props.active === 'true' ? 'var(--primary-color)' : 'var(--secondary-bg)'};
  color: ${props => props.active === 'true' ? 'white' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.active === 'true' ? 'var(--primary-color)' : 'var(--border-color)'};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active === 'true' ? 'var(--primary-hover)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

export const ReportList = styled.div`
  padding: 0;
`;

export const ReportItem = styled.div`
  padding: 24px 32px;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const ReportInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const BoardType = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'boardType'
})<{ boardType: 'drip' | 'freeboard' }>`
  padding: 4px 8px;
  background-color: ${props => props.boardType === 'drip' ? '#4ecdc4' : '#ff6b6b'};
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
`;

export const TargetType = styled.span`
  padding: 4px 8px;
  background-color: var(--secondary-bg);
  color: var(--text-secondary);
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
`;

export const ReportReason = styled.span<{ color: string }>`
  padding: 4px 8px;
  background-color: ${props => props.color}20;
  color: ${props => props.color};
  border: 1px solid ${props => props.color}40;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
`;

export const ReportDate = styled.span`
  color: var(--text-tertiary);
  font-size: 12px;
`;

export const ReportContent = styled.div`
  margin-bottom: 16px;
`;

export const ContentPreview = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== 'clickable'
})<{ clickable?: boolean }>`
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  word-break: break-word;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  
  ${props => props.clickable && `
    &:hover {
      color: var(--primary-color);
      text-decoration: underline;
    }
  `}
`;

export const ReportFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const ReportDetails = styled.div`
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--text-secondary);
  
  span {
    display: flex;
    align-items: center;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'danger'
})<{ danger?: boolean }>`
  padding: 6px 12px;
  background-color: ${props => props.danger ? '#ff4757' : 'var(--secondary-bg)'};
  color: ${props => props.danger ? 'white' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.danger ? '#ff4757' : 'var(--border-color)'};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.danger ? '#ff3742' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

export const EmptyState = styled.div`
  padding: 60px 32px;
  text-align: center;
  
  p {
    color: var(--text-tertiary);
    font-size: 16px;
    margin: 0;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 32px;
  
  p {
    color: var(--text-secondary);
    font-size: 14px;
    margin: 16px 0 0 0;
  }
`;

export const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 32px;
  
  p {
    color: #ff4757;
    font-size: 14px;
    margin: 0 0 16px 0;
  }
`;