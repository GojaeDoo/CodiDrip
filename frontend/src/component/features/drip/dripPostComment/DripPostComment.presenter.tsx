import React from "react";
import * as S from "./DripPostComment.styled";
import { DripPostCommentPresenterProps } from "./DripPostComment.types";

export const DripPostCommentPresenter = ({
  comments,
  formattedComments,
}: DripPostCommentPresenterProps) => {
  return (
    <S.CommentSection>
      <S.CommentInput placeholder="댓글을 입력하세요..." />

      <S.CommentList>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <S.Comment key={index}>
              <S.CommentUserImage
                src={`http://localhost:3005/uploads/profiles/${comment.프로필이미지}`}
                alt="Comment user"
              />
              <S.CommentContent>
                <S.CommentHeader>
                  <S.CommentUserName>{comment.닉네임}</S.CommentUserName>
                  <S.CommentTime>{formattedComments[index]}</S.CommentTime>
                </S.CommentHeader>
                <S.CommentText>{comment.댓글내용}</S.CommentText>
              </S.CommentContent>
            </S.Comment>
          ))
        ) : (
          <S.Comment>
            <S.CommentUserImage src={undefined} alt="Comment user" />
            <S.CommentContent>
              <S.CommentHeader>
                <S.CommentUserName>댓글이 없습니다</S.CommentUserName>
              </S.CommentHeader>
              <S.CommentText>첫 번째 댓글을 작성해보세요!</S.CommentText>
            </S.CommentContent>
          </S.Comment>
        )}
      </S.CommentList>
    </S.CommentSection>
  );
};

export default DripPostCommentPresenter;
