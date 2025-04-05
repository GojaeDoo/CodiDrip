"use client";

import * as S from "./Intro.styled";

const IntroPresenter = () => {
  return (
    <S.IntroWrapper>
      <S.LeftSection>
        <S.Title>DripDrop</S.Title>
        <S.SubTitle>당신의 스타일을 공유하세요</S.SubTitle>
        <S.Description>
          자신의 패션을 공유하고, 영감을 얻고, 새로운 스타일을 발견하세요.
          DripDrop은 당신의 개성을 표현할 수 있는 최고의 플랫폼입니다.
        </S.Description>
        <S.ButtonWrapper>
          <S.PrimaryButton>시작하기</S.PrimaryButton>
          <S.SecondaryButton>더 알아보기</S.SecondaryButton>
        </S.ButtonWrapper>
        <S.Features>
          <S.Feature>
            <S.FeatureIcon>👕</S.FeatureIcon>
            <S.FeatureContent>
              <S.FeatureTitle>스타일 공유</S.FeatureTitle>
              <S.FeatureDescription>
                당신만의 독특한 스타일을 공유하세요
              </S.FeatureDescription>
            </S.FeatureContent>
          </S.Feature>
          <S.Feature>
            <S.FeatureIcon>👔</S.FeatureIcon>
            <S.FeatureContent>
              <S.FeatureTitle>코디 추천</S.FeatureTitle>
              <S.FeatureDescription>
                새로운 스타일을 발견하세요
              </S.FeatureDescription>
            </S.FeatureContent>
          </S.Feature>
          <S.Feature>
            <S.FeatureIcon>👗</S.FeatureIcon>
            <S.FeatureContent>
              <S.FeatureTitle>커뮤니티</S.FeatureTitle>
              <S.FeatureDescription>
                패션 애호가들과 소통하세요
              </S.FeatureDescription>
            </S.FeatureContent>
          </S.Feature>
        </S.Features>
      </S.LeftSection>
      <S.RightSection>
        <S.BackgroundImage />
        <S.Overlay />
      </S.RightSection>
    </S.IntroWrapper>
  );
};

export default IntroPresenter;
