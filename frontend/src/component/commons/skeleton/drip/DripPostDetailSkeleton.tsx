import * as S from "./DripPostDetailSkeleton.styled";
import DripPostCommentSkeleton from "./DripPostCommentSkeleton";

const DripPostDetailSkeleton = () => {
  return (
    <S.SkeletonBackground>
      <S.SkeletonWrapper>
        <S.SkeletonMainSection>
          <S.SkeletonImageBox />
          
          <S.SkeletonProfileBox>
            <S.SkeletonUserInfo>
              <S.SkeletonProfileImage />
              <S.SkeletonUserText>
                <S.SkeletonUserName />
                <S.SkeletonUserStats />
              </S.SkeletonUserText>
            </S.SkeletonUserInfo>
            
            <S.SkeletonInteractionSection>
              <S.SkeletonInteractionButton>
                <S.SkeletonButtonIcon />
                <S.SkeletonButtonText />
              </S.SkeletonInteractionButton>
              <S.SkeletonInteractionButton>
                <S.SkeletonButtonIcon />
                <S.SkeletonButtonText />
              </S.SkeletonInteractionButton>
              <S.SkeletonInteractionButton>
                <S.SkeletonButtonIcon />
                <S.SkeletonButtonText />
              </S.SkeletonInteractionButton>
            </S.SkeletonInteractionSection>
          </S.SkeletonProfileBox>
          
          <S.SkeletonTagBox>
            <S.SkeletonTagList>
              <S.SkeletonTag />
              <S.SkeletonTag />
            </S.SkeletonTagList>
          </S.SkeletonTagBox>
        </S.SkeletonMainSection>
        <DripPostCommentSkeleton />
      </S.SkeletonWrapper>
    </S.SkeletonBackground>
  );
};

export default DripPostDetailSkeleton;
