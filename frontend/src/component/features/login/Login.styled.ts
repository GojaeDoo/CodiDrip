import styled from "styled-components";

export const Background = styled.div`
  position: absolute; /* ✅ body 위에 배경을 덮지 않고 위치 조정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(217, 217, 217, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

export const LoginWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 2vh;
  width: 30vw;
  height: 45vh;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 5vh 5vw 5vh 5vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const LoginTitle = styled.div`
  font-size: 2rem;
  font-weight: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MoveWrapper = styled.div`
  width: 21.3vw;
  height: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Link = styled.span`
  font-size: 1rem;
  cursor: pointer;
`;

export const LoginText = styled.span`
  font-size: 1rem;
`;
