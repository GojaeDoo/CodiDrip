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
`;

export const DripsSelectBtn = styled.button`
  width: 9vw;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--card-bg);
  color: var(--text-primary);
  min-width: 100px;
  min-height: 20px;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;
  font-size: 1.2rem;
  border-radius: 10px;
  border: 1px solid var(--card-border);
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
