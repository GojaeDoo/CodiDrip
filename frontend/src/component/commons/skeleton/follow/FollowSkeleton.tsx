import React from "react";
import * as S from "./FollowSkeleton.styled";

interface FollowSkeletonProps {
  count?: number;
}

const FollowSkeleton: React.FC<FollowSkeletonProps> = ({ count = 6 }) => {
  return (
    <S.SkeletonList>
      {Array.from({ length: count }).map((_, idx) => (
        <S.SkeletonItem key={idx}>
          <S.SkeletonProfile />
          <S.SkeletonInfo>
            <S.SkeletonName />
            <S.SkeletonDetail />
            <S.SkeletonAbout />
          </S.SkeletonInfo>
        </S.SkeletonItem>
      ))}
    </S.SkeletonList>
  );
};

export default FollowSkeleton;
