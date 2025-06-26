import React from "react";
import * as S from "./FreeBoardListSkeleton.styled";

const FreeBoardListSkeleton = () => {
  return (
    <S.SkeletonWrapper>
      {[...Array(8)].map((_, idx) => (
        <S.SkeletonRow key={idx}>
          <S.SkeletonBox style={{ width: "40px" }} />
          <S.SkeletonBox style={{ width: "100%" }} />
          <S.SkeletonBox style={{ width: "60px" }} />
          <S.SkeletonBox style={{ width: "80px" }} />
          <S.SkeletonBox style={{ width: "40px" }} />
        </S.SkeletonRow>
      ))}
    </S.SkeletonWrapper>
  );
};

export default FreeBoardListSkeleton;
