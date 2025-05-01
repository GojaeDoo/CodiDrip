import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #1a1a1a;
`;

export const DripsSelectWrapper = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: column;
  padding-left: 2vw;
`;

export const DripsSelectWrapperTop = styled.div`
  width: 100%;
  height: 50%;
`;

export const DripsSelectWrapperTopTitle = styled.div`
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-top: 3vh;
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
  background-color: #ffffff;

  &:hover {
    color: #ffffff;
    background-color: #000000;
  }
`;
