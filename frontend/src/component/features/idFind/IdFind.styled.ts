import styled from "styled-components";

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

export const IdFindWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 2vh;
  width: 30vw;
  height: 45vh;
  background-color: #1a1a1a;
  border-radius: 5px;
  padding: 5vh 5vw 5vh 5vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const IdFindTitle = styled.div`
  font-size: 2rem;
  font-weight: 1000;
  color: #ffffff;
`;

export const IdInputText = styled.div`
  font-size: 1rem;
  font-weight: 1000;
  color: #ffffff;
`;
