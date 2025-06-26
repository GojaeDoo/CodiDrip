import React from "react";
import * as S from "./FreeBoardComment.styled";
import { FreeBoardCommentPresenterProps } from "./FreeBoardComment.types";

export const FreeBoardCommentPresenter: React.FC<FreeBoardCommentPresenterProps> = ({
  comments = [],
  isLoading = false,
  isModalOpen,
  newComment,
  editingCommentId,
  editContent,
  replyingToCommentId,
  replyContent,
  showingRepliesFor,
  replies,
  onOpenModal,
  onCloseModal,
  onNewCommentChange,
  onSubmitComment,
  onEditComment,
  onSaveEdit,
  onCancelEdit,
  onEditContentChange,
  onDeleteComment,
  onShowMoreComments,
  onShowLessComments,
  onReplyComment,
  onCancelReply,
  onReplyContentChange,
  onSubmitReply,
  onShowReplies,
  onHideReplies,
  formatTimestamp,
  getInitials,
  hasMoreComments,
  showAllComments,
  isLogin,
  isCommentAuthor,
}) => {
  if (isLoading) {
    return (
      <S.FreeBoardCommentWrapper>
        <S.CommentHeader>
          <div>
            <h2>댓글</h2>
            <div className="comment-count">로딩 중...</div>
          </div>
        </S.CommentHeader>
        <S.CommentList>
          <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
            댓글을 불러오는 중...
          </div>
        </S.CommentList>
      </S.FreeBoardCommentWrapper>
    );
  }

  return (
    <>
      <S.FreeBoardCommentWrapper>
        <S.CommentHeader>
          <div>
            <h2>댓글</h2>
            <div className="comment-count">{comments.length}개의 댓글</div>
          </div>
          <S.AddCommentButton onClick={onOpenModal}>
            댓글 작성
          </S.AddCommentButton>
        </S.CommentHeader>

        <S.CommentList>
          {comments.length === 0 ? (
            <S.EmptyState>
              <div className="empty-icon">💬</div>
              <p className="empty-text">아직 댓글이 없습니다.<br />첫 번째 댓글을 남겨보세요!</p>
            </S.EmptyState>
          ) : (
            comments.map((comment) => {
              return (
                <S.CommentItem key={comment.id}>
                  <S.CommentHeaderInfo>
                    <S.UserAvatar>
                      {comment.profile_image ? (
                        <img 
                          src={`http://localhost:3005/uploads/profiles/${comment.profile_image}`} 
                          alt={comment.profile_nickname}
                          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : (
                        getInitials(comment.profile_nickname)
                      )}
                    </S.UserAvatar>
                    <S.UserInfo>
                      <p className="username">{comment.profile_nickname}</p>
                      <p className="timestamp">{formatTimestamp(comment.created_at)}</p>
                    </S.UserInfo>
                    <S.CommentActions>
                      {isLogin && isCommentAuthor(comment.user_id) && (
                        <>
                          <button onClick={() => onEditComment(comment)}>
                            수정
                          </button>
                          <button onClick={() => onDeleteComment(comment.id)}>
                            삭제
                          </button>
                        </>
                      )}
                      {isLogin && (
                        <button onClick={() => onReplyComment(comment.id)}>
                          댓글
                        </button>
                      )}
                    </S.CommentActions>
                  </S.CommentHeaderInfo>
                  
                  {editingCommentId === comment.id ? (
                    <S.EditInputWrapper>
                      <S.CommentInput
                        value={editContent}
                        onChange={(e) => onEditContentChange(e.target.value)}
                        placeholder="댓글을 수정하세요..."
                      />
                      <S.ButtonGroup>
                        <S.SaveButton onClick={onSaveEdit}>저장</S.SaveButton>
                        <S.CancelButton onClick={onCancelEdit}>취소</S.CancelButton>
                      </S.ButtonGroup>
                    </S.EditInputWrapper>
                  ) : (
                    <S.CommentContent>{comment.content}</S.CommentContent>
                  )}

                  {/* 대댓글 입력 UI */}
                  {replyingToCommentId === comment.id && (
                    <S.ReplyInputWrapper>
                      <S.ReplyInput
                        value={replyContent}
                        onChange={(e) => onReplyContentChange(e.target.value)}
                        placeholder="대댓글을 작성하세요..."
                      />
                      <S.ReplyButtonGroup>
                        <S.ReplySubmitButton 
                          onClick={onSubmitReply}
                          disabled={!replyContent.trim()}
                        >
                          답글 작성
                        </S.ReplySubmitButton>
                        <S.ReplyCancelButton onClick={onCancelReply}>
                          취소
                        </S.ReplyCancelButton>
                      </S.ReplyButtonGroup>
                    </S.ReplyInputWrapper>
                  )}

                  {/* 대댓글 보기 버튼 */}
                  {comment.reply_count !== undefined && comment.reply_count > 0 && (
                    <S.ReplyWrapper style={{ marginTop: "0.5rem" }}>
                      {showingRepliesFor === comment.id ? (
                        <S.ToggleReplyButton onClick={() => onHideReplies(comment.id)}>
                          ↑ 댓글 숨기기
                        </S.ToggleReplyButton>
                      ) : (
                        <S.ToggleReplyButton onClick={() => onShowReplies(comment.id)}>
                          ↓ 댓글 ({comment.reply_count}개)
                        </S.ToggleReplyButton>
                      )}
                    </S.ReplyWrapper>
                  )}

                  {/* 대댓글 목록 */}
                  {showingRepliesFor === comment.id && replies[comment.id] && replies[comment.id].length > 0 && (
                    <S.ReplyWrapper>
                      {replies[comment.id].map((reply) => (
                        <S.ReplyContainer key={reply.id}>
                          <S.ReplyHeader>
                            <S.ReplyAvatar>
                              {reply.profile_image ? (
                                <img 
                                  src={`http://localhost:3005/uploads/profiles/${reply.profile_image}`} 
                                  alt={reply.profile_nickname}
                                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                />
                              ) : (
                                getInitials(reply.profile_nickname)
                              )}
                            </S.ReplyAvatar>
                            <span style={{ 
                              fontWeight: "600", 
                              marginRight: "0.75rem",
                              color: "#ffffff",
                              fontSize: "14px"
                            }}>
                              {reply.profile_nickname}
                            </span>
                            <span style={{ 
                              color: "#888", 
                              fontSize: "12px",
                              fontWeight: "500"
                            }}>
                              {formatTimestamp(reply.created_at)}
                            </span>
                            {isLogin && isCommentAuthor(reply.user_id) && (
                              <div style={{ marginLeft: "auto", display: "flex" }}>
                                <S.ReplyActionButton onClick={() => onEditComment(reply)}>
                                  수정
                                </S.ReplyActionButton>
                                <S.ReplyActionButton onClick={() => onDeleteComment(reply.id)}>
                                  삭제
                                </S.ReplyActionButton>
                              </div>
                            )}
                          </S.ReplyHeader>
                          
                          {editingCommentId === reply.id ? (
                            <S.ReplyEditWrapper>
                              <S.ReplyEditInput
                                value={editContent}
                                onChange={(e) => onEditContentChange(e.target.value)}
                                placeholder="대댓글을 수정하세요..."
                              />
                              <S.ReplyEditButtonGroup>
                                <S.ReplyEditSaveButton onClick={onSaveEdit}>
                                  저장
                                </S.ReplyEditSaveButton>
                                <S.ReplyEditCancelButton onClick={onCancelEdit}>
                                  취소
                                </S.ReplyEditCancelButton>
                              </S.ReplyEditButtonGroup>
                            </S.ReplyEditWrapper>
                          ) : (
                            <div style={{ 
                              color: "#e0e0e0", 
                              lineHeight: "1.6",
                              fontSize: "14px",
                              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                            }}>
                              {reply.content}
                            </div>
                          )}
                        </S.ReplyContainer>
                      ))}
                    </S.ReplyWrapper>
                  )}

                  {/* 대댓글이 없을 때 메시지 */}
                  {showingRepliesFor === comment.id && (!replies[comment.id] || replies[comment.id].length === 0) && (
                    <S.NoReply>
                      아직 대댓글이 없습니다.
                    </S.NoReply>
                  )}
                </S.CommentItem>
              );
            })
          )}
        </S.CommentList>

        {hasMoreComments && (
          <S.ShowMoreButton onClick={showAllComments ? onShowLessComments : onShowMoreComments}>
            {showAllComments ? "댓글 접기" : `댓글 더보기`}
          </S.ShowMoreButton>
        )}
      </S.FreeBoardCommentWrapper>

      {isModalOpen && (
        <S.ModalOverlay onClick={onCloseModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <h3>댓글 작성</h3>
              <button className="close-button" onClick={onCloseModal}>
                ×
              </button>
            </S.ModalHeader>
            
            <S.ModalBody>
              <S.CommentInput
                value={newComment}
                onChange={(e) => onNewCommentChange(e.target.value)}
                placeholder="댓글을 작성하세요..."
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) {
                    onSubmitComment();
                  }
                }}
              />
            </S.ModalBody>
            
            <S.ModalFooter>
              <button className="cancel" onClick={onCloseModal}>
                취소
              </button>
              <button 
                className="submit" 
                onClick={onSubmitComment}
                disabled={!newComment.trim()}
              >
                댓글 작성
              </button>
            </S.ModalFooter>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
};

export default FreeBoardCommentPresenter;