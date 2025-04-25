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

export const IdFindSuccessWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 2vh;
  width: 50vw;
  height: 45vh;
  background-color: #1a1a1a;
  border-radius: 5px;
  padding: 5vh 5vw 5vh 5vw;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IdFindSuccessImage = styled.img`
  width: 76px;
  height: 76px;
  margin-bottom: 5vh;
`;

export const Input = styled.input`
  width: 20vw;
  height: 5vh;
  font-size: 1rem;
  background-color: rgba(217, 217, 217, 0.9);
  outline: none;
  border: 1px solid rgba(217, 217, 217, 0.9);
  border-radius: 5px;
  padding-left: 1vw;
  margin-bottom: 2vh;
`;

export const IdFindSuccessText = styled.div`
  font-size: 1.5rem;
  font-weight: 1000;
  color: #ffffff;
  margin-bottom: 2vh;
`;
