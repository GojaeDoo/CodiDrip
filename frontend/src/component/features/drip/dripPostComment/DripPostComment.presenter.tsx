import React from "react";
import * as S from "./DripPostComment.styled";
import { Send, Heart, MoreVertical } from "lucide-react";
import {DripPostCommentContainerProps} from "./DripPostComment.types"


const DripPostComment = (props: DripPostCommentContainerProps) => {
  return (
    <S.CommentSection>
      {/* 댓글 입력창 */}
      <S.CommentInputWrapper>
        <S.CommentInput
          placeholder="댓글을 작성하세요..."
          onChange={props.onChangeComment}
        />
        <S.SubmitButton type="button" onClick={props.onSubmitComment}>
          <Send size={20} />
        </S.SubmitButton>
      </S.CommentInputWrapper>
      {props.commentList && props.commentList.length > 0 && (
        <S.CommentList>
          {props.commentList.map((commentList) => (
            <S.CommentItem key={commentList.id}>
              <S.CommentProfileImage
                src={`http://localhost:3005/uploads/profiles/${commentList.profile_image}`}
                alt="프로필"
              />
              <S.CommentContentBox>
                <S.CommentNickname>{commentList.profile_nickname}</S.CommentNickname>
                {props.editingCommentId === commentList.id ? (
                  <>
                    <S.CommentInput
                      value={props.editContent}
                      onChange={e => props.setEditContent?.(e.target.value)}
                      style={{ marginBottom: 8 }}
                    />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <S.SubmitButton type="button" onClick={props.onEditSubmit}>완료</S.SubmitButton>
                      <S.SubmitButton type="button" onClick={props.onEditCancel}>취소</S.SubmitButton>
                    </div>
                  </>
                ) : (
                  <S.CommentText>{commentList.content}</S.CommentText>
                )}
                <S.CommentLikeRow>
                  <S.CommentLikeButton onClick={() => props.onLikeComment?.(commentList.id)}>
                    <Heart size={16} fill={commentList.liked ? "#ff4d4d" : "none"} />
                  </S.CommentLikeButton>
                  <S.CommentLikeCount>{commentList.like_count ?? 0}</S.CommentLikeCount>
                </S.CommentLikeRow>
                <S.CommentDate>{commentList.created_at}</S.CommentDate>
              </S.CommentContentBox>

              {props.myUserId && commentList.user_id === props.myUserId && (
                <S.CommentMenuWrapper>
                  <S.CommentMenuButton onClick={() => props.handleMenuOpen?.(commentList.id)}>
                    <MoreVertical size={18} />
                  </S.CommentMenuButton>
                  {props.activeMenuId === commentList.id && (
                    <S.CommentMenu>
                      <S.CommentMenuItem onClick={() => props.onEditComment?.(commentList.id)}>수정</S.CommentMenuItem>
                      <S.CommentMenuItem onClick={() => props.onDeleteComment?.(commentList.id)}>삭제</S.CommentMenuItem>
                    </S.CommentMenu>
                  )}
                </S.CommentMenuWrapper>
              )}
            </S.CommentItem>
          ))}
        </S.CommentList>
      )}
    </S.CommentSection>
  );
};

export default DripPostComment;
