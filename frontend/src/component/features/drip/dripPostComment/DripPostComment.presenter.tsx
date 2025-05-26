import React from "react";
import * as S from "./DripPostComment.styled";
import { Comment, DripPostCommentProps } from "./DripPostComment.types";
import { MessageCircle, Send } from "lucide-react";

const DripPostComment: React.FC<DripPostCommentProps> = ({
  postno,
  comments,
  isLoading,
  commentContent,
  onCommentContentChange,
  onCommentSubmit,
  replyContents,
  onReplyContentChange,
  onReplySubmit,
  showReplies,
  onShowReplies,
  replies,
}) => {
  if (isLoading) {
    return <S.Loading>댓글을 불러오는 중...</S.Loading>;
  }

  return (
    <S.CommentSection>
      <S.CommentForm onSubmit={onCommentSubmit}>
        <S.CommentInput
          value={commentContent || ""}
          onChange={(e) => onCommentContentChange(e.target.value)}
          placeholder="댓글을 작성하세요..."
        />
        <S.SubmitButton type="submit" disabled={!commentContent?.trim()}>
          <Send size={20} />
        </S.SubmitButton>
      </S.CommentForm>

      <S.CommentList>
        {comments?.map((comment) => (
          <S.CommentItem key={comment.id}>
            <S.CommentHeader>
              <S.UserInfo>
                <S.ProfileImage
                  src={`http://localhost:3005/uploads/profiles/${comment.user?.profile_image}`}
                  alt={comment.user?.nickname || "사용자"}
                />
                <S.UserName>{comment.user?.nickname || "사용자"}</S.UserName>
              </S.UserInfo>
              <S.CommentDate>
                {new Date(comment.created_at).toLocaleDateString()}
              </S.CommentDate>
            </S.CommentHeader>
            <S.CommentContent>{comment.content}</S.CommentContent>
            <S.CommentActions>
              <S.ReplyButton onClick={() => onShowReplies(comment.id)}>
                <MessageCircle size={16} />
                답글 {replies[comment.id]?.length > 0 && `(${replies[comment.id].length})`}
              </S.ReplyButton>
            </S.CommentActions>
            {showReplies[comment.id] && (
              <S.RepliesSection>
                <S.CommentForm onSubmit={(e) => onReplySubmit(e, comment.id)}>
                  <S.CommentInput
                    value={replyContents[comment.id] || ""}
                    onChange={(e) => onReplyContentChange(comment.id, e.target.value)}
                    placeholder="답글을 작성하세요..."
                  />
                  <S.SubmitButton type="submit" disabled={!replyContents[comment.id]?.trim()}>
                    <Send size={20} />
                  </S.SubmitButton>
                </S.CommentForm>
                {replies[comment.id]?.map((reply) => (
                  <S.ReplyItem key={reply.id}>
                    <S.CommentHeader>
                      <S.UserInfo>
                        <S.ProfileImage
                          src={`http://localhost:3005/uploads/profiles/${reply.user?.profile_image}`}
                          alt={reply.user?.nickname || "사용자"}
                        />
                        <S.UserName>{reply.user?.nickname || "사용자"}</S.UserName>
                      </S.UserInfo>
                      <S.CommentDate>
                        {new Date(reply.created_at).toLocaleDateString()}
                      </S.CommentDate>
                    </S.CommentHeader>
                    <S.CommentContent>{reply.content}</S.CommentContent>
                  </S.ReplyItem>
                ))}
              </S.RepliesSection>
            )}
          </S.CommentItem>
        ))}
      </S.CommentList>
    </S.CommentSection>
  );
};

export default DripPostComment;
