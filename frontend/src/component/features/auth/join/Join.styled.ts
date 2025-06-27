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

export const JoinWrapper = styled.div`
  padding: 3vh 0;
  box-sizing: border-box;
  margin-top: 2vh;
  width: 30vw;
  height: 65vh;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  @media (max-width: 1024px) {
    width: 50vw;
    height: 70vh;
    padding: 2vh 0;
  }

  @media (max-width: 768px) {
    width: 90vw;
    height: auto;
    min-height: 80vh;
    margin-top: 0;
    padding: 2vh 0;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    width: 95vw;
    min-height: 75vh;
    padding: 1vh 0;
  }
`;

export const JoinTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  transition: color 0.3s ease;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const IdCheckWrapper = styled.div`
  position: relative;
  width: 20vw;

  @media (max-width: 1024px) {
    width: 40vw;
  }

  @media (max-width: 768px) {
    width: 80vw;
  }

  @media (max-width: 480px) {
    width: 85vw;
  }
`;

export const IdInput = styled.input`
  width: 20vw;
  height: 5vh;
  font-size: 1rem;
  background-color: var(--card-border);
  outline: none;
  border: 1px solid var(--card-border);
  border-radius: 5px;
  padding-left: 1vw;
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
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    width: 80vw;
    height: 6vh;
    font-size: 0.85rem;
    padding-left: 3vw;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    width: 85vw;
    height: 7vh;
    font-size: 0.8rem;
    padding-left: 4vw;
  }
`;

export const IdCheckBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 4vw;
  font-size: 0.9rem;
  height: 5vh;
  outline: none;
  border: 1px solid var(--card-border);
  border-radius: 5px;
  background-color: var(--card-border);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    color: var(--text-primary);
    background-color: var(--accent);
  }

  @media (max-width: 1024px) {
    width: 8vw;
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    width: 20vw;
    height: 6vh;
    font-size: 0.9rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    width: 25vw;
    height: 7vh;
    font-size: 1rem;
  }
`;

export const PasswordWrapper = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    width: 40vw;
  }

  @media (max-width: 768px) {
    width: 80vw;
  }

  @media (max-width: 480px) {
    width: 85vw;
  }
`;

export const PasswordInfo = styled.div`
  font-size: 0.9rem;
  color: var(--text-primary);
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const EmailWrapper = styled.div`
  position: relative;
  width: 20vw;

  @media (max-width: 1024px) {
    width: 40vw;
  }

  @media (max-width: 768px) {
    width: 80vw;
  }

  @media (max-width: 480px) {
    width: 85vw;
  }
`;

export const Email = styled.input`
  width: 7vw;
  height: 5vh;
  outline: none;
  font-size: 1rem;
  border: 1px solid var(--card-border);
  background-color: var(--card-border);
  border-radius: 5px;
  padding-left: 1vw;
  color: var(--text-primary);
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    border-color: var(--accent);
  }

  @media (max-width: 1024px) {
    width: 14vw;
    padding-left: 2vw;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    width: 28vw;
    height: 6vh;
    font-size: 0.85rem;
    padding-left: 3vw;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    width: 30vw;
    height: 7vh;
    font-size: 0.8rem;
    padding-left: 4vw;
  }
`;

export const JoinText = styled.span`
  font-size: 1.4rem;
  font-weight: 1000;
  text-align: center;
  color: var(--text-primary);
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const EmailInput = styled.input`
  width: 6.83vw;
  height: 5vh;
  outline: none;
  font-size: 1rem;
  border: 1px solid var(--card-border);
  background-color: var(--card-border);
  border-radius: 5px;
  padding-left: 1vw;
  color: var(--text-primary);
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    border-color: var(--accent);
  }

  @media (max-width: 1024px) {
    width: 13.66vw;
    padding-left: 2vw;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    width: 27.32vw;
    height: 6vh;
    font-size: 0.85rem;
    padding-left: 3vw;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    width: 29.32vw;
    height: 7vh;
    font-size: 0.8rem;
    padding-left: 4vw;
  }
`;

export const EmailSelect = styled.select`
  width: 9.95vw;
  height: 5vh;
  outline: none;
  font-size: 1rem;
  border: 1px solid var(--card-border);
  background-color: var(--card-border);
  border-radius: 5px;
  padding-left: 1vw;
  color: var(--text-primary);
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  &:focus {
    border-color: var(--accent);
  }

  @media (max-width: 1024px) {
    width: 19.9vw;
    padding-left: 2vw;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    width: 39.8vw;
    height: 6vh;
    font-size: 0.85rem;
    padding-left: 3vw;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    width: 42.8vw;
    height: 7vh;
    font-size: 0.8rem;
    padding-left: 4vw;
  }
`;

export const JoinInfoWrapper = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1024px) {
    width: 40vw;
  }

  @media (max-width: 768px) {
    width: 80vw;
  }

  @media (max-width: 480px) {
    width: 85vw;
  }
`;

export const Label = styled.span`
  width: 22vw;
  font-size: 0.9rem;
  color: var(--text-primary);
  transition: color 0.3s ease;

  @media (max-width: 1024px) {
    width: 44vw;
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    width: 88vw;
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    width: 93vw;
    font-size: 0.7rem;
  }
`;

export const JoinInfo = styled.input`
  font-size: 0.2rem;
  font-weight: 1000;
  color: var(--text-primary);
  transition: color 0.3s ease;
`;

export const JoinTextSm = styled.span`
  font-size: 0.5rem;
  font-weight: 1000;
  text-align: center;
  color: var(--text-primary);
  transition: color 0.3s ease;
`;

export const EmailCheckBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 4vw;
  height: 5vh;
  outline: none;
  font-size: 0.9rem;
  border: 1px solid var(--card-border);
  border-radius: 5px;
  background-color: var(--card-border);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    color: var(--text-primary);
    background-color: var(--accent);
  }

  @media (max-width: 1024px) {
    width: 8vw;
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    width: 20vw;
    height: 6vh;
    font-size: 0.9rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    width: 25vw;
    height: 7vh;
    font-size: 1rem;
  }
`;
