import styled from "styled-components";

export const Background = styled.div`
  position: absolute; /* ✅ body 위에 배경을 덮지 않고 위치 조정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(217, 217, 217, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

export const LoginWrapper = styled.div`
  width: 10vw;
  height: 10vh;
  background-color: #ffffff;
`;
