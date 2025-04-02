import styled from "styled-components";

export const Background = styled.div`
  position: absolute;
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

export const JoinWrapper = styled.div`
  padding: 3vh 0;
  box-sizing: border-box;
  margin-top: 2vh;
  width: 30vw;
  height: 65vh;
  background-color: #ffffff;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const JoinTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IdCheckWrapper = styled.div`
  position: relative;
  width: 21.2vw;
`;

export const IdInput = styled.input`
  width: 19vw;
  height: 5vh;
  font-size: 1rem;
  background-color: rgba(217, 217, 217, 0.9);
  outline: none;
  border: 1px solid rgba(217, 217, 217, 0.9);
  border-radius: 5px;
  padding-left: 1vw;
`;

export const IdCheckBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 5vw;
  height: 5.5vh;
  outline: none;
  border: 1px solid #919497;
  border-radius: 5px;
  background-color: #919497;
  color: 11ee1e;

  &:hover {
    color: #ffffff;
    background-color: #262a2d;
  }
`;

export const PasswordWrapper = styled.div`
  width: 21.2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmailWrapper = styled.div`
  position: relative;
  width: 21.2vw;
`;

export const PasswordInfo = styled.div`
  font-size: 1rem;
`;

export const Email = styled.input`
  width: 7.7vw;
  height: 5vh;
  outline: none;
  font-size: 1rem;
  border: 1px solid rgba(217, 217, 217, 0.9);
  background-color: rgba(217, 217, 217, 0.9);
  border-radius: 5px;
  padding-left: 1vw;
`;

export const JoinText = styled.span`
  font-size: 2rem;
  font-weight: 1000;
  text-align: center;
`;

export const EmailSelect = styled.select`
  width: 9.08vw;
  height: 5vh;
  outline: none;
  font-size: 1rem;
  border: 1px solid rgba(217, 217, 217, 0.9);
  background-color: rgba(217, 217, 217, 0.9);
  border-radius: 5px;
  padding-left: 1vw;
`;

export const JoinInfoWrapper = styled.div`
  width: 22vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.span`
  width: 22vw;
  font-size: 0.9rem;
`;

export const JoinInfo = styled.input`
  font-size: 0.2rem;
  font-weight: 1000;
`;

export const JoinTextSm = styled.span`
  font-size: 0.5rem;
  font-weight: 1000;
  text-align: center;
`;
