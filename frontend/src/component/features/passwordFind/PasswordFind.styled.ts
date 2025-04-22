import styled from "@emotion/styled";

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

export const PasswordFindWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 2vh;
  width: 50vw;
  height: 40vh;
  background-color: #1a1a1a;
  border-radius: 5px;
  padding: 5vh 5vw 5vh 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PasswordFindTitle = styled.div`
  font-size: 2rem;
  font-weight: 1000;
  color: #ffffff;
`;

export const PasswordFindText = styled.div`
  font-size: 1rem;
  font-weight: 1000;
  color: #ffffff;
  margin-top: 5vh;
`;

export const PasswordFindInputWrapper = styled.div`
  margin-top: 2.5vh;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vh;
`;

export const PasswordFindButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #000;
  color: #fff;
`;
