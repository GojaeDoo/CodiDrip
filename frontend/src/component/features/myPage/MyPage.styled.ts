import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MyPageWrapper = styled.div`
  width: 40vw;
  height: 70vh;

  display: flex;
  flex-direction: column;
`;

export const WrapperTop = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
`;

export const WrapperTopLeft = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileImage = styled.img`
  width: 20vw;
  height: 25vh;
  border-radius: 50%;
`;

export const WrapperTopRight = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 6vw;
`;

export const ProfileName = styled.div`
  font-size: 2.3rem;
  font-weight: bold;
  color: #ffffff;
`;

export const MyPageTextWrapper = styled.div`
  width: 100%;
`;

export const MyPageText = styled.span`
  font-size: 1.5rem;
  color: #ffffff;
`;

export const MyPageBigText = styled.span`
  font-size: 2.3rem;
  color: #ffffff;
`;

export const WrapperCenter = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
`;

export const CenterLeft = styled.div`
  width: 50%;
  height: 70%;
  border-right: 1px solid #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CenterRight = styled.div`
  width: 50%;
  height: 70%;
  border-left: 1px solid #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const WrapperBottom = styled.div`
  width: 100%;
  height: 40%;
  display: grid;
  padding: 1vw;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2vw;
  box-sizing: border-box;
`;

export const MyPageNavigation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.8rem;
  border-radius: 0.5rem;
`;
