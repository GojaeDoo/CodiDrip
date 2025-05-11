import React from "react";
import * as S from "./DripPostComment.styled";

export const DripPostCommentPresenter = () => {
  return (
    <S.CommentSection>
      <S.CommentInput placeholder="댓글을 입력하세요..." />

      <S.CommentList>
        <S.Comment>
          <S.CommentUserImage src={undefined} alt="Comment user" />
          <S.CommentContent>
            <S.CommentUserName>댓글이 없습니다</S.CommentUserName>
            <S.CommentText>첫 번째 댓글을 작성해보세요!</S.CommentText>
          </S.CommentContent>
        </S.Comment>
      </S.CommentList>
    </S.CommentSection>
  );
};

export default DripPostCommentPresenter;
