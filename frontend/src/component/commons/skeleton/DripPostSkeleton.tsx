import * as S from "./DripPostSkeleton.styled";

const DripPostSkeleton = () => {
  return (
    <S.SkeletonWrapper>
      <S.SkeletonHeader>
        <S.SkeletonProfileImage />
        <S.SkeletonUserInfo>
          <S.SkeletonUsername />
          <S.SkeletonUserStats />
        </S.SkeletonUserInfo>
      </S.SkeletonHeader>
      <S.SkeletonImage />
      <S.SkeletonActions>
        <S.SkeletonAction />
        <S.SkeletonAction />
      </S.SkeletonActions>
      <S.SkeletonTags>
        <S.SkeletonTag />
        <S.SkeletonTag />
        <S.SkeletonTag />
      </S.SkeletonTags>
    </S.SkeletonWrapper>
  );
};

export default DripPostSkeleton; 