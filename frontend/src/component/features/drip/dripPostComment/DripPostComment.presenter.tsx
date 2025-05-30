import React, { useState } from "react";
import * as S from "./DripPostComment.styled";
import { Send, Heart, MoreVertical, MessageCircle } from "lucide-react";
import { DripPostCommentContainerProps } from "./DripPostComment.types";

interface DripPostCommentProps extends DripPostCommentContainerProps {
  commentContent: string;
  setCommentContent: (content: string) => void;
  replyContent: string;
}

const DripPostComment = ({
  commentList,
  onChangeComment,
  onSubmitComment,
  onLikeComment,
  handleMenuOpen,
  activeMenuId,
  onEditComment,
  onDeleteComment,
  editingCommentId,
  editContent,
  setEditContent,
  onEditSubmit,
  onEditCancel,
  replyingToId,
  onReplyClick,
  onChangeReply,
  onSubmitReply,
  myUserId,
  commentContent,
  setCommentContent,
  expandedReplies,
  toggleReplies,
  replyContent
}: DripPostCommentProps) => {
  return (
    <S.CommentSection>
      <S.CommentInputWrapper>
        <S.CommentInput
          placeholder="댓글을 입력하세요"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <S.SubmitButton onClick={onSubmitComment}>작성</S.SubmitButton>
      </S.CommentInputWrapper>
      {commentList && commentList.length > 0 && (
        <S.CommentList>
          {commentList.map((comment) => (
            <React.Fragment key={comment.id}>
              <S.CommentItem>
                <S.CommentProfileImage
                  src={`http://localhost:3005/uploads/profiles/${comment.profile_image}` || "/default-profile.png"}
                  alt={comment.profile_nickname}
                />
                <S.CommentContentBox>
                  <S.CommentNickname>{comment.profile_nickname}</S.CommentNickname>
                  {editingCommentId === comment.id ? (
                    <S.CommentInputWrapper>
                      <S.CommentInput
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                      />
                      <S.SubmitButton onClick={onEditSubmit}>수정</S.SubmitButton>
                      <S.SubmitButton onClick={onEditCancel}>취소</S.SubmitButton>
                    </S.CommentInputWrapper>
                  ) : (
                    <S.CommentText>{comment.content}</S.CommentText>
                  )}
                  <S.CommentLikeRow>
                    <S.CommentLikeButton
                      onClick={() => {
                        console.log('Comment like status before click:', comment.liked);
                        onLikeComment(comment.id);
                      }}
                      $isLiked={comment.liked}
                    >
                      {(() => {
                        console.log('Rendering heart for comment:', comment.id, 'liked:', comment.liked);
                        return comment.liked ? "♥" : "♡";
                      })()}
                    </S.CommentLikeButton>
                    <S.CommentLikeCount $isLiked={comment.liked}>
                      {comment.like_count}
                    </S.CommentLikeCount>
                    <S.ReplyButton onClick={() => onReplyClick(comment.id)}>
                      <MessageCircle size={16} />
                      답글
                    </S.ReplyButton>
                  </S.CommentLikeRow>
                  <S.CommentDate>{comment.created_at}</S.CommentDate>
                  {comment.replies && comment.replies.length > 0 && (
                    <S.ReplySection>
                      <S.ReplyToggleButton onClick={() => toggleReplies(comment.id)}>
                        답글 {comment.replies.length}개 {expandedReplies[comment.id] ? '접기' : '더보기'}
                      </S.ReplyToggleButton>
                      {expandedReplies[comment.id] && (
                        <S.ReplyList>
                          {comment.replies.map((reply) => (
                            <S.ReplyItem key={reply.id}>
                              <S.ReplyMeta>
                                <S.CommentProfileImage
                                  src={`http://localhost:3005/uploads/profiles/${reply.profile_image}` || "/default-profile.png"}
                                  alt={reply.profile_nickname}
                                />
                                <S.CommentNickname>{reply.profile_nickname}</S.CommentNickname>
                                <S.CommentDate>{reply.created_at}</S.CommentDate>
                              </S.ReplyMeta>
                              {editingCommentId === reply.id ? (
                                <S.CommentInputWrapper>
                                  <S.CommentInput
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                  />
                                  <S.SubmitButton onClick={onEditSubmit}>수정</S.SubmitButton>
                                  <S.SubmitButton onClick={onEditCancel}>취소</S.SubmitButton>
                                </S.CommentInputWrapper>
                              ) : (
                                <S.ReplyContent>{reply.content}</S.ReplyContent>
                              )}
                              <S.ReplyActions>
                                <S.ReplyActionButton onClick={() => onLikeComment(reply.id)}>
                                  <S.HeartIcon $isLiked={reply.liked}>
                                    {reply.liked ? "♥" : "♡"}
                                  </S.HeartIcon>
                                  {" "}({reply.like_count})
                                </S.ReplyActionButton>
                                {myUserId === reply.user_id && (
                                  <>
                                    <S.ReplyActionButton onClick={() => onEditComment(reply.id)}>
                                      수정
                                    </S.ReplyActionButton>
                                    <S.ReplyActionButton onClick={() => onDeleteComment(reply.id)}>
                                      삭제
                                    </S.ReplyActionButton>
                                  </>
                                )}
                              </S.ReplyActions>
                            </S.ReplyItem>
                          ))}
                        </S.ReplyList>
                      )}
                    </S.ReplySection>
                  )}
                </S.CommentContentBox>

                {myUserId === comment.user_id && (
                  <S.CommentMenuWrapper>
                    <S.CommentMenuButton onClick={() => handleMenuOpen(comment.id)}>
                      ⋮
                    </S.CommentMenuButton>
                    {activeMenuId === comment.id && (
                      <S.CommentMenu>
                        <S.CommentMenuItem onClick={() => onEditComment(comment.id)}>
                          수정
                        </S.CommentMenuItem>
                        <S.CommentMenuItem onClick={() => onDeleteComment(comment.id)}>
                          삭제
                        </S.CommentMenuItem>
                      </S.CommentMenu>
                    )}
                  </S.CommentMenuWrapper>
                )}
              </S.CommentItem>

              {replyingToId === comment.id && (
                <S.ReplyInputWrapper>
                  <S.ReplyInput
                    placeholder="답글을 입력하세요"
                    value={replyContent}
                    onChange={onChangeReply}
                  />
                  <S.SubmitButton onClick={onSubmitReply}>작성</S.SubmitButton>
                </S.ReplyInputWrapper>
              )}
            </React.Fragment>
          ))}
        </S.CommentList>
      )}
    </S.CommentSection>
  );
};

export default DripPostComment;
