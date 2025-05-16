import React from "react";
import * as S from "./DripPostComment.styled";
import { DripPostCommentPresenterProps } from "./DripPostComment.types";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export const DripPostCommentPresenter = (
  props: DripPostCommentPresenterProps
) => {
  return (
    <S.CommentSection>
      <S.CommentInput
        placeholder="댓글을 입력하세요..."
        onChange={props.onChangePostComment}
        onKeyDown={props.onKeyDownPostComment}
      />

      <S.CommentList>
        {props.fetchDripComment && props.fetchDripComment.length > 0 ? (
          props.fetchDripComment.map((fetchDripComment, index) => (
            <S.Comment key={index}>
              <S.CommentUserImage
                src={`http://localhost:3005/uploads/profiles/${fetchDripComment.프로필이미지}`}
                alt="Comment user"
              />
              <S.CommentContent>
                <S.CommentHeader>
                  <S.CommentUserName>
                    {fetchDripComment.닉네임}
                  </S.CommentUserName>
                  <S.CommentTime>
                    {props.formattedComments[index]}
                  </S.CommentTime>
                </S.CommentHeader>
                <S.CommentText>{fetchDripComment.댓글내용}</S.CommentText>
                <S.CommentActions>
                  <S.ActionButton>
                    <FaThumbsUp />
                  </S.ActionButton>
                  <S.ActionButton className="dislike">
                    <FaThumbsDown />
                  </S.ActionButton>
                </S.CommentActions>
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
