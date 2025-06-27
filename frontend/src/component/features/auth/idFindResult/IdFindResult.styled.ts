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
  background-color: var(--background);
  transition: background-color 0.3s ease;
`;

export const IdFindSuccessWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 2vh;
  width: 50vw;
  height: 45vh;
  border-radius: 5px;
  padding: 5vh 5vw 5vh 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  @media (max-width: 1024px) {
    width: 60vw;
    height: 50vh;
    padding: 4vh 4vw 4vh 4vw;
  }

  @media (max-width: 768px) {
    width: 90vw;
    height: auto;
    min-height: 60vh;
    margin-top: 0;
    padding: 3vh 4vw 3vh 4vw;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    width: 95vw;
    padding: 2vh 3vw 2vh 3vw;
    min-height: 55vh;
  }
`;

export const IdFindSuccessImage = styled.img`
  width: 76px;
  height: 76px;
  margin-bottom: 5vh;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-bottom: 3vh;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    margin-bottom: 2vh;
  }
`;

export const Input = styled.input`
  width: 20vw;
  height: 5vh;
  font-size: 1rem;
  background-color: var(--card-border);
  outline: none;
  border: 1px solid var(--card-border);
  border-radius: 5px;
  padding-left: 1vw;
  margin-bottom: 2vh;
  color: var(--text-primary);
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    border-color: var(--accent);
  }

  @media (max-width: 1024px) {
    width: 40vw;
    padding-left: 2vw;
  }

  @media (max-width: 768px) {
    width: 80vw;
    height: 6vh;
    font-size: 1rem;
    padding-left: 3vw;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    width: 85vw;
    height: 7vh;
    font-size: 1.1rem;
    padding-left: 4vw;
  }
`;

export const IdFindSuccessText = styled.div`
  font-size: 1.5rem;
  font-weight: 1000;
  color: var(--text-primary);
  margin-bottom: 2vh;
  transition: color 0.3s ease;

  @media (max-width: 1024px) {
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5vh;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 1vh;
  }
`;
