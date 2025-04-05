"use client";

import React from "react";
import * as S from "./Intro.styled";
import { IntroProps } from "./Intro.types";

const IntroPresenter = ({
  onClickLogin,
  onClickJoin,
  brandName,
  scatterDirections,
}: IntroProps) => {
  return (
    <S.IntroWrapper>
      <S.SplashScreen>
        <S.SplashText>당신의 스타일을 공유하세요</S.SplashText>
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
          <S.Title>DripDrop</S.Title>
          <S.Description>
            패션을 사랑하는 모든 이들을 위한 공간, DripDrop에서 당신만의
            스타일을 공유하고 새로운 영감을 얻어보세요.
          </S.Description>
          <S.ButtonWrapper>
            <S.PrimaryButton onClick={onClickJoin}>시작하기</S.PrimaryButton>
            <S.SecondaryButton onClick={onClickLogin}>로그인</S.SecondaryButton>
          </S.ButtonWrapper>

          <S.Features>
            <S.Feature>
              <S.FeatureIcon>👕</S.FeatureIcon>
              <S.FeatureContent>
                <S.FeatureTitle>스타일 공유</S.FeatureTitle>
                <S.FeatureDescription>
                  당신의 패션을 공유하고 다른 이들의 스타일에서 영감을 얻으세요
                </S.FeatureDescription>
              </S.FeatureContent>
            </S.Feature>
            <S.Feature>
              <S.FeatureIcon>💬</S.FeatureIcon>
              <S.FeatureContent>
                <S.FeatureTitle>커뮤니티</S.FeatureTitle>
                <S.FeatureDescription>
                  패션을 사랑하는 사람들과 소통하고 경험을 나누세요
                </S.FeatureDescription>
              </S.FeatureContent>
            </S.Feature>
            <S.Feature>
              <S.FeatureIcon>🎯</S.FeatureIcon>
              <S.FeatureContent>
                <S.FeatureTitle>Driper</S.FeatureTitle>
                <S.FeatureDescription>
                  Driper를 통해 더 나은 스타일을 찾아보세요
                </S.FeatureDescription>
              </S.FeatureContent>
            </S.Feature>
          </S.Features>
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
