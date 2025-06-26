import React from "react";
import * as S from "./FreeBoardSkeleton.styled";

interface FreeBoardSkeletonProps {
  count?: number;
}

const FreeBoardSkeleton: React.FC<FreeBoardSkeletonProps> = ({ count = 6 }) => {
  return (
    <S.SkeletonList>
      {Array.from({ length: count }).map((_, idx) => (
        <S.SkeletonItem key={idx}>
          <S.SkeletonTitle />
          <S.SkeletonContent />
          <S.SkeletonContent style={{ width: '80%' }} />
          <S.SkeletonMeta>
            <S.SkeletonDate />
            <S.SkeletonViews />
          </S.SkeletonMeta>
        </S.SkeletonItem>
      ))}
    </S.SkeletonList>
  );
};

export default FreeBoardSkeleton;
