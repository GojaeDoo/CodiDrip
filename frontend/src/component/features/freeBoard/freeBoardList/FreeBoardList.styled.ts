import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #1a1a1a;
  padding: 20px;
`;

export const FreeBoardListWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: #1a1a1a;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

export const Header = styled.div`
  background-color: #1a1a1a;
  padding: 32px;
  text-align: center;
  border-bottom: 1px solid #333;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const Subtitle = styled.p`
  color: #b0b0b0;
  font-size: 16px;
  margin: 8px 0 0 0;
`;

export const Content = styled.div`
  padding: 32px;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #333;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const SearchInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #333;
  border-radius: 8px;
  background: #2a2a2a;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
  width: 300px;

  &:focus {
    border-color: #4a90e2;
  }

  &::placeholder {
    color: #666;
  }
`;

export const SearchButton = styled.button`
  padding: 12px 20px;
  background-color: rgba(217, 217, 217, 0.9);
  outline: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #262a2d;
    color: #ffffff;
  }
`;

export const WriteButton = styled.button`
  padding: 12px 24px;
  background-color: rgba(217, 217, 217, 0.9);
  outline: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #262a2d;
    color: #ffffff;
  }
`;

export const BoardTable = styled.div`
  background: #222;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #333;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px 100px;
  gap: 16px;
  padding: 16px 24px;
  background: #2a2a2a;
  border-bottom: 1px solid #333;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px 100px;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #333;
  transition: background-color 0.1s;
  cursor: pointer;

  &:hover {
    background: #2a2a2a;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const Cell = styled.div`
  color: #e0e0e0;
  font-size: 14px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-content: center;
`;

export const TitleCell = styled(Cell)`
  font-weight: 500;
  color: #fff;
  
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
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #333;
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
`;

export const PageInfo = styled.span`
  color: #888;
  font-size: 14px;
  margin: 0 16px;
`;
