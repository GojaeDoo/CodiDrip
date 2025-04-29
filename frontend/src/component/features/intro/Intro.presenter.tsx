"use client";

import React from "react";
import * as S from "./Intro.styled";
import { IntroProps } from "./Intro.types";

const IntroPresenter = ({
  onClickMoveLogin,
  onClickMoveDrips,
  brandName,
  scatterDirections,
}: IntroProps) => {
  return (
    <S.IntroWrapper>
      <S.SplashScreen>
        <S.SplashText>Drop It. Flex It. Own It.</S.SplashText>
        <S.BrandName>
          {brandName.split("").map((letter, index) => (
            <S.BrandLetter
              key={index}
              delay={index}
              style={
                {
                  "--tx": scatterDirections[index].tx,
                  "--ty": scatterDirections[index].ty,
                } as React.CSSProperties
              }
            >
              {letter}
            </S.BrandLetter>
          ))}
        </S.BrandName>
      </S.SplashScreen>
      <S.MainContent>
        <S.LeftSection>
          <S.Title>CODIDRIP</S.Title>
          <S.Description>
            패션을 사랑하는 모든 이들을 위한 공간, CODIDRIP에서 당신만의
            스타일을 공유하고 새로운 영감을 얻어보세요.
          </S.Description>
          <S.ButtonWrapper>
            <S.PrimaryButton onClick={onClickMoveDrips}>
              시작하기
            </S.PrimaryButton>
            <S.SecondaryButton onClick={onClickMoveLogin}>
              로그인
            </S.SecondaryButton>
          </S.ButtonWrapper>
        </S.LeftSection>
        <S.RightSection>
          <S.BackgroundImage />
          <S.Overlay />
        </S.RightSection>
      </S.MainContent>
    </S.IntroWrapper>
  );
};

export default IntroPresenter;
