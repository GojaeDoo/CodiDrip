import React from "react";
import * as S from "./MyPageSkeleton.styled";

const MyPageSkeleton: React.FC = () => {
  return (
    <S.SkeletonBackground>
      <S.SkeletonWrapper>
        <S.SkeletonProfileSection>
          <S.SkeletonProfileImage />
          <S.SkeletonProfileInfo>
            <S.SkeletonName />
            <S.SkeletonStats>
              <S.SkeletonStat />
              <S.SkeletonStat />
            </S.SkeletonStats>
            <S.SkeletonBio />
            <S.SkeletonDetails />
          </S.SkeletonProfileInfo>
        </S.SkeletonProfileSection>
        <S.SkeletonTabButtons>
          <S.SkeletonTab />
          <S.SkeletonTab />
          <S.SkeletonTab />
          <S.SkeletonTab />
          <S.SkeletonTab />
          <S.SkeletonTab />
        </S.SkeletonTabButtons>
        <S.SkeletonCard />
        <S.SkeletonCard />
      </S.SkeletonWrapper>
    </S.SkeletonBackground>
  );
};

export default MyPageSkeleton;
