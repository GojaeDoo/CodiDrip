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
  background-color: var(--background);
  transition: background-color 0.3s ease;
`;

export const PasswordFindResultWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 2vh;
  width: 50vw;
  height: 40vh;
  border-radius: 5px;
  padding: 5vh 5vw 5vh 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  @media (max-width: 1024px) {
    width: 60vw;
    height: 45vh;
    padding: 4vh 4vw 4vh 4vw;
  }

  @media (max-width: 768px) {
    width: 90vw;
    height: auto;
    min-height: 55vh;
    margin-top: 0;
    padding: 3vh 4vw 3vh 4vw;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    width: 95vw;
    padding: 2vh 3vw 2vh 3vw;
    min-height: 50vh;
  }
`;

export const PasswordFindResultTitle = styled.div`
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

export const PasswordFindResultText = styled.div`
  font-size: 1rem;
  font-weight: 1000;
  color: var(--text-primary);
  margin-top: 5vh;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-top: 3vh;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-top: 2vh;
  }
`;

export const PasswordFindInputResultWrapper = styled.div`
  margin-top: 2.5vh;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vh;

  @media (max-width: 768px) {
    margin-top: 2vh;
    height: auto;
    gap: 1.5vh;
  }

  @media (max-width: 480px) {
    margin-top: 1.5vh;
    gap: 2vh;
  }
`;

export const PasswordFindResultButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: var(--accent);
  color: var(--text-primary);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--accent-hover);
  }

  @media (max-width: 768px) {
    height: 50px;
    font-size: 1.1rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    height: 55px;
    font-size: 1.2rem;
  }
`;
