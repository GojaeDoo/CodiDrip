import styled, { createGlobalStyle } from "styled-components";

export const FreeBoardListGlobalStyle = createGlobalStyle`
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

export const FreeBoardListWrapper = styled.div`
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
  background-color: var(--card-bg);
  padding: 32px;
  text-align: center;
  border-bottom: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  @media (max-width: 768px) {
    padding: 16px 8px;
  }
`;

export const Title = styled.h1`
  color: var(--text-primary);
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: color 0.3s ease;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 16px;
  margin: 8px 0 0 0;
  transition: color 0.3s ease;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Content = styled.div`
  padding: 32px;
  @media (max-width: 768px) {
    padding: 12px 4px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--card-border);
  transition: border-color 0.3s ease;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    gap: 4px;
  }
`;

export const SearchInput = styled.input`
  padding: 12px 16px;
  border: 2px solid var(--card-border);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s, background-color 0.3s ease, color 0.3s ease;
  width: 300px;
  @media (max-width: 768px) {
    width: 100%;
    font-size: 13px;
    padding: 8px 8px;
  }
`;

export const SearchButton = styled.button`
  padding: 12px 20px;
  background-color: var(--button-bg);
  color: var(--button-text);
  outline: none;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: var(--button-hover);
    border-color: var(--button-hover);
    color: var(--button-text);
  }
  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

export const WriteButton = styled.button`
  padding: 12px 24px;
  background-color: var(--button-bg);
  color: var(--button-text);
  outline: none;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: var(--button-hover);
    border-color: var(--button-hover);
    color: var(--button-text);
  }
  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 13px;
    width: 100%;
    margin-top: 4px;
  }
`;

export const BoardTable = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--card-border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  @media (max-width: 768px) {
    border-radius: 6px;
    font-size: 13px;
  }
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px 100px;
  gap: 16px;
  padding: 16px 24px;
  background: var(--card-border);
  border-bottom: 1px solid var(--card-border);
  font-weight: 600;
  color: var(--text-primary);
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px 100px;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--card-border);
  transition: background-color 0.1s, border-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background: var(--card-border);
  }
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 14px 8px;
    background: var(--card-bg);
    border-radius: 8px;
    margin-bottom: 10px;
    border: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;

export const Cell = styled.div`
  color: var(--text-primary);
  font-size: 14px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;
  @media (max-width: 768px) {
    font-size: 13px;
    white-space: normal;
    word-break: break-word;
  }
`;

export const TitleCell = styled(Cell)`
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.3s ease;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2px;
  }
`;

export const AuthorCell = styled(Cell)`
  color: #b0b0b0;
  justify-content: center;
`;

export const DateCell = styled(Cell)`
  color: #888;
  font-size: 12px;
  justify-content: center;
`;

export const ViewCell = styled(Cell)`
  color: #888;
  justify-content: center;
`;

export const NoPosts = styled.div`
  text-align: center;
  padding: 60px 24px;
  color: #666;
  font-size: 16px;
  @media (max-width: 768px) {
    padding: 32px 4px;
    font-size: 13px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #333;
  @media (max-width: 768px) {
    gap: 4px;
    margin-top: 12px;
    padding-top: 8px;
  }
`;

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${props => props.active ? '#4a90e2' : '#333'};
  background: ${props => props.active ? '#4a90e2' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#b0b0b0'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  &:hover {
    background: ${props => props.active ? '#357abd' : '#2a2a2a'};
    border-color: ${props => props.active ? '#357abd' : '#4a90e2'};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    padding: 4px 6px;
    font-size: 12px;
  }
`;

export const PageInfo = styled.span`
  color: #888;
  font-size: 14px;
  margin: 0 16px;
  @media (max-width: 768px) {
    font-size: 12px;
    margin: 0 4px;
  }
`;

export const MetaRow = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    gap: 8px;
    color: #b0b0b0;
    font-size: 0.9rem;
    margin-top: 2px;
  }
`;
