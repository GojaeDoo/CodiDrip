import React from "react";
import * as S from "./DripUserSkeleton.styled";

interface DripUserSkeletonProps {
  count?: number;
}

export const DripUserSkeleton: React.FC<DripUserSkeletonProps> = ({ count = 6 }) => {
  return (
    <S.Background>
      <S.UserDripWrapper>
        {Array.from({ length: count }).map((_, index) => (
          <S.UserCard key={index}>
            <S.ProfileImageWrapper>
              <S.ProfileImageSkeleton />
            </S.ProfileImageWrapper>
            <S.UserInfo>
              <S.NicknameSkeleton />
              <S.UserStatsSkeleton />
            </S.UserInfo>
          </S.UserCard>
        ))}
      </S.UserDripWrapper>
    </S.Background>
  );
};

export default DripUserSkeleton;
