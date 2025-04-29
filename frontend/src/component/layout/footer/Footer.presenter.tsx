"use client";

import * as S from "./Footer.styled";

const FooterPresenter = () => {
  return (
    <>
      <S.FooterContainer>
        <S.FooterContainerLeft>
          <S.FooterInnerLeft>
            <S.FooterText>상호명 : </S.FooterText>
            <S.FooterBrand>CODIDRIP</S.FooterBrand>
            <S.FooterText> | </S.FooterText>
            <S.FooterText>주소 : </S.FooterText>
            <S.FooterText>서울특별시 마포구 동교로</S.FooterText>
          </S.FooterInnerLeft>
          <S.FooterInnerLeft>
            <S.FooterText>이메일 : </S.FooterText>
            <S.FooterText>minchoi9979@naver.com</S.FooterText>
            <S.FooterText> | </S.FooterText>
            <S.FooterText>사업자대표 : </S.FooterText>
            <S.FooterText>최현민</S.FooterText>
          </S.FooterInnerLeft>
        </S.FooterContainerLeft>
        <S.FooterContainerRight>
          <S.FooterInterRight>
            <S.FooterInterRight>
              <S.FooterBigText>사업자정보확인</S.FooterBigText>
              <S.FooterBigText>&nbsp;|&nbsp;</S.FooterBigText>
              <S.FooterBigText>이용약관</S.FooterBigText>
              <S.FooterBigText>&nbsp;|&nbsp;</S.FooterBigText>
              <S.FooterBigText> 사업자정보확인</S.FooterBigText>
            </S.FooterInterRight>
          </S.FooterInterRight>
        </S.FooterContainerRight>
      </S.FooterContainer>
    </>
  );
};

export default FooterPresenter;
