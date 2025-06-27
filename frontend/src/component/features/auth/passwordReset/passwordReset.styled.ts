import styled from "styled-components";

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  transition: background-color 0.3s ease;
`;

export const PasswordResetWrapper = styled.div`
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

export const PasswordResetTitle = styled.div`
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

export const PasswordResetSubTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2vh;
  text-align: center;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5vh;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1vh;
  }
`;

export const PasswordResetText = styled.div`
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

export const PasswordResetSubText = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 2vh;
  text-align: center;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 1.5vh;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 1vh;
  }
`;

export const PasswordResetInputWrapper = styled.div`
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

export const PasswordResetButton = styled.button`
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

export const ErrorMessage = styled.div`
  color: var(--danger);
  font-size: 0.9rem;
  margin-top: 1vh;
  text-align: center;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-top: 0.8vh;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-top: 0.5vh;
  }
`;