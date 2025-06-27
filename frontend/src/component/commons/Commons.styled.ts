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
  color: var(--text-primary);
  transition: color 0.3s ease;
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
  color: var(--text-primary);
  transition: color 0.3s ease;
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

export const Button = styled.button`
  width: 20vw;
  height: 5vh;
  background-color: var(--button-bg);
  outline: none;
  border: 1px solid var(--button-bg);
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  color: var(--button-text);
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--button-hover);
    border-color: var(--button-hover);
    color: var(--button-text);
  }

  @media (max-width: 1024px) {
    width: 40vw;
  }

  @media (max-width: 768px) {
    width: 80vw;
    height: 6vh;
    font-size: 1.1rem;
    border-radius: 25px;
  }

  @media (max-width: 480px) {
    width: 85vw;
    height: 7vh;
    font-size: 1.2rem;
  }
`;