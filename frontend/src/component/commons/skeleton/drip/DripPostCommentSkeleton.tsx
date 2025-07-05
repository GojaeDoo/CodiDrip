import * as S from "./DripPostCommentSkeleton.styled";

const DripPostCommentSkeleton = () => {
  return (
    <S.SkeletonCommentSection>
      <S.SkeletonCommentBox>
        <S.SkeletonCommentHeader>
          <S.SkeletonCommentProfileImage />
          <S.SkeletonCommentUserInfo>
            <S.SkeletonCommentUserName />
          <S.SkeletonCommentText />
          </S.SkeletonCommentUserInfo>
        </S.SkeletonCommentHeader>
        <S.SkeletonCommentContent>
            <S.SkeletonCommentOption /> 
            <S.SkeletonCommentOption /> 
            <S.SkeletonCommentOption /> 
        </S.SkeletonCommentContent>
      </S.SkeletonCommentBox>

      <S.SkeletonCommentBox>
        <S.SkeletonCommentHeader>
          <S.SkeletonCommentProfileImage />
          <S.SkeletonCommentUserInfo>
            <S.SkeletonCommentUserName />
          <S.SkeletonCommentText />
          </S.SkeletonCommentUserInfo>
        </S.SkeletonCommentHeader>
        <S.SkeletonCommentContent>
            <S.SkeletonCommentOption /> 
            <S.SkeletonCommentOption /> 
            <S.SkeletonCommentOption /> 
        </S.SkeletonCommentContent>
      </S.SkeletonCommentBox>

      <S.SkeletonCommentBox>
        <S.SkeletonCommentHeader>
          <S.SkeletonCommentProfileImage />
          <S.SkeletonCommentUserInfo>
            <S.SkeletonCommentUserName />
          <S.SkeletonCommentText />
          </S.SkeletonCommentUserInfo>
        </S.SkeletonCommentHeader>
        <S.SkeletonCommentContent>
            <S.SkeletonCommentOption /> 
            <S.SkeletonCommentOption /> 
            <S.SkeletonCommentOption /> 
        </S.SkeletonCommentContent>
      </S.SkeletonCommentBox>

    </S.SkeletonCommentSection>
  );
};

export default DripPostCommentSkeleton;
