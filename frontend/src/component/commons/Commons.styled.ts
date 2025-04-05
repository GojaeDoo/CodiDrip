import styled from "styled-components";

export const Title = styled.div`
  margin: 0 auto;
  width: auto;
  height: 100%;
  font-size: 2rem;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const SpareTitle = styled.div`
  margin: 0 auto;
  width: auto;
  font-size: 2.5rem;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
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
`;

export const Button = styled.button`
  width: 21.3vw;
  height: 5vh;
  background-color: rgba(217, 217, 217, 0.9);
  outline: none;
  border: 1px solid rgba(217, 217, 217, 0.9);
  border-radius: 5px;
  font-size: 1rem;
  border-radius: 20px;

  cursor: pointer;

  &:hover {
    background-color: #262a2d;
    color: #ffffff;
  }
`;
