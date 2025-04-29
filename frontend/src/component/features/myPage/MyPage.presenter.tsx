import * as S from "./MyPage.styled";
import { MyPageProps } from "./MyPage.types";

export const MyPagePresenter = (props: MyPageProps) => {
  return (
    <>
      <S.Background>
        <S.MyPageWrapper>
          <S.WrapperTop>
            <S.WrapperTopLeft>
              <S.ProfileImage src={props.userProfile?.profile_image} />
            </S.WrapperTopLeft>
            <S.WrapperTopRight>
              <S.ProfileName>
                {props.userProfile?.profile_nickname}
              </S.ProfileName>
              <S.MyPageTextWrapper>
                <S.MyPageText>Follow</S.MyPageText>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <S.MyPageText>
                  {props.userProfile?.profile_follow || 0}
                </S.MyPageText>
              </S.MyPageTextWrapper>
            </S.WrapperTopRight>
          </S.WrapperTop>
          <S.WrapperCenter>
            <S.CenterLeft>
              <S.MyPageBigText>MY DRIP</S.MyPageBigText>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <S.MyPageText>5</S.MyPageText>
            </S.CenterLeft>
            <S.CenterRight>
              <S.MyPageBigText>LIKE</S.MyPageBigText>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <S.MyPageText>37</S.MyPageText>
            </S.CenterRight>
          </S.WrapperCenter>
          <S.WrapperBottom>
            <S.MyPageNavigation>으어어</S.MyPageNavigation>
            <S.MyPageNavigation>으어어</S.MyPageNavigation>
            <S.MyPageNavigation>으어어</S.MyPageNavigation>
            <S.MyPageNavigation>으어어</S.MyPageNavigation>
          </S.WrapperBottom>
        </S.MyPageWrapper>
      </S.Background>
    </>
  );
};

export default MyPagePresenter;
