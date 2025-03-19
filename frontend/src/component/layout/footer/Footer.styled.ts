import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding: 0 50px;
  display: flex;
  flex-direction: row;
`;

export const FooterContainerLeft = styled.div`
  width: 50%;
  height: 100%;
  border-top: 1px solid black;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const FooterInnerLeft = styled.div`
  width: 100%;
`;

export const FooterText = styled.span`
  font-size: 1rem;
`;

export const FooterBrand = styled.span`
  font-size: 1rem;
  font-family: "Inter", sans-serif;
  font-weight: 1000;
`;

export const FooterContainerRight = styled.div`
  width: 50%;
  height: 100%;
  border-top: 1px solid black;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FooterInterRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const FooterBigText = styled.span`
  font-size: 1.2rem;
  font-weight: 1000;
`;
