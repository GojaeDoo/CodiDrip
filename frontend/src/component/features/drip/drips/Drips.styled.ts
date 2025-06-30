import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--background);
  transition: background-color 0.3s ease;
`;

export const DripsSelectWrapper = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: column;
  padding-left: 2vw;
  margin-bottom: 3vh;
`;

export const DripsSelectWrapperTop = styled.div`
  width: 100%;
  height: 50%;
`;

export const DripsSelectWrapperTopTitle = styled.div`
  color: var(--text-primary);
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-top: 3vh;
  transition: color 0.3s ease;
`;

export const DripsSelectWrapperBottom = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 1vw;
  position: relative;
`;

export const DripsSelectBtn = styled.button<{ $isActive?: boolean }>`
  width: 9vw;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$isActive ? 'var(--accent)' : 'var(--card-bg)'};
  color: var(--text-primary);
  min-width: 85px;
  min-height: 20px;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;
  font-size: 1.2rem;
  border-radius: 10px;
  border: 1px solid ${props => props.$isActive ? 'var(--accent)' : 'var(--card-border)'};
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  &:hover {
    color: var(--text-primary);
    background-color: var(--accent);
    border-color: var(--accent);
  }
`;

export const DripPostWrapper = styled.div`
  width: 100%;
  max-width: 2100px;
  min-height: 70vh;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0 24px;
  margin: 0 auto;
  justify-content: flex-start;

  @media (max-width: 768px) {
    gap: 0.75rem;
    padding: 0 12px; // 모바일에서는 패딩 줄임
  }
`;

export const StyleFilterDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 250px;
`;

export const StyleFilterTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

export const StyleFilterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyleFilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--card-border);
  }
`;

export const StyleCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: var(--accent);
  cursor: pointer;
`;

export const StyleLabel = styled.label`
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  user-select: none;
  flex: 1;
`;

export const StyleFilterClose = styled.button`
  width: 100%;
  padding: 0.5rem;
  background: var(--accent);
  color: var(--text-primary);
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--accent-hover);
  }
`;
