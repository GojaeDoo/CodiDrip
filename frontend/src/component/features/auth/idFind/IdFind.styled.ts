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

export const IdFindWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 2vh;
  width: 30vw;
  height: 45vh;
  border-radius: 5px;
  padding: 5vh 5vw 5vh 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  @media (max-width: 1024px) {
    width: 50vw;
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

export const IdFindTitle = styled.div`
  font-size: 2rem;
  font-weight: 1000;
  color: var(--text-primary);
  transition: color 0.3s ease;

  @media (max-width: 1024px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const IdInputText = styled.div`
  font-size: 1rem;
  font-weight: 1000;
  color: var(--text-primary);
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;
