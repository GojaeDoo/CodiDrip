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

export const LoginWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 2vh;
  width: 30vw;
  height: 45vh;
  border-radius: 5px;
  padding: 5vh 5vw 5vh 5vw;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

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

export const LoginTitle = styled.div`
  font-size: 2rem;
  font-weight: 1000;
  color: var(--text-primary);
  transition: color 0.3s ease;

  /* 태블릿 */
  @media (max-width: 1024px) {
    font-size: 1.8rem;
  }

  /* 모바일 */
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  /* 작은 모바일 */
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MoveWrapper = styled.div`
  width: 21.3vw;
  height: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  /* 태블릿 */
  @media (max-width: 1024px) {
    width: 40vw;
  }

  /* 모바일 */
  @media (max-width: 768px) {
    width: 80vw;
    height: auto;
    margin-top: 1rem;
  }

  /* 작은 모바일 */
  @media (max-width: 480px) {
    width: 85vw;
  }
`;

export const Link = styled.span`
  font-size: 1rem;
  cursor: pointer;
  color: var(--text-primary);
  transition: color 0.3s ease;
  &:hover {
    color: var(--text-secondary);
  }

  /* 모바일 */
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem;
  }

  /* 작은 모바일 */
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const LoginText = styled.span`
  font-size: 1rem;
  color: var(--text-primary);
  transition: color 0.3s ease;

  /* 모바일 */
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  /* 작은 모바일 */
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;
