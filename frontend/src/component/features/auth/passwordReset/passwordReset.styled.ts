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

export const PasswordResetWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 2vh;
  width: 50vw;
  height: 20vh;
  background-color: #1a1a1a;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vh;
  margin-bottom: 2vh;
`;

export const PasswordResetTitle = styled.div`
  font-size: 2rem;
  font-weight: 1000;
  color: #ffffff;
`;

export const PasswordResetSubTitle = styled.div`
  font-size: 1rem;
  font-weight: 1000;
  color: #ffffff;
`;

export const PasswordResetSubText = styled.div`
  font-size: 0.8rem;
  font-weight: 1000;
  color: #ffffff;
`;

export const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 0.8rem;
  font-weight: 1000;
`;
