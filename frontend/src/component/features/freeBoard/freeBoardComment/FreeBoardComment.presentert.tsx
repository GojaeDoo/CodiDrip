import React from "react";
import * as S from "./FreeBoardComment.styled";
import { FreeBoardCommentPresenterProps } from "./FreeBoardComment.types";

export const FreeBoardCommentPresenter: React.FC<FreeBoardCommentPresenterProps> = (props:FreeBoardCommentPresenterProps) => {
  if (props.isLoading) {
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
            <div className="comment-count">{props.comments.length}개의 댓글</div>
          </div>
          <S.AddCommentButton onClick={props.onOpenModal}>
            댓글 작성
          </S.AddCommentButton>
        </S.CommentHeader>

        <S.CommentList>
          {props.comments?.length === 0 ? (
            <S.EmptyState>
              <div className="empty-icon">💬</div>
              <p className="empty-text">아직 댓글이 없습니다.<br />첫 번째 댓글을 남겨보세요!</p>
            </S.EmptyState>
          ) : (
            props.comments?.map((comment) => {
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
                        props.getInitials(comment.profile_nickname)
                      )}
                    </S.UserAvatar>
                    <S.UserInfo>
                      <p className="username">{comment.profile_nickname}</p>
                      <p className="timestamp">{props.formatTimestamp(comment.created_at)}</p>
                    </S.UserInfo>
                    <S.CommentActions>
                      {props.isLogin && props.isCommentAuthor(comment.user_id) && (
                        <button onClick={() => props.onEditComment(comment)}>수정</button>
                      )}
                      {props.isLogin && (props.isCommentAuthor(comment.user_id) || props.isAdmin) && (
                        <button onClick={() => props.onDeleteComment(comment.id)}>삭제</button>
                      )}
                      {props.isLogin && !props.isCommentAuthor(comment.user_id) && !props.isAdmin && (
                        <button onClick={() => props.onReportClick(comment.id)}>신고</button>
                      )}
                      {props.isLogin && (
                        <button onClick={() => props.onReplyComment(comment.id)}>댓글</button>
                      )}
                    </S.CommentActions>
                  </S.CommentHeaderInfo>
                  
                  {props.editingCommentId === comment.id ? (
                    <S.EditInputWrapper>
                      <S.CommentInput
                        value={props.editContent}
                        onChange={(e) => props.onEditContentChange(e.target.value)}
                        placeholder="댓글을 수정하세요..."
                      />
                      <S.ButtonGroup>
                        <S.SaveButton onClick={props.onSaveEdit}>저장</S.SaveButton>
                        <S.CancelButton onClick={props.onCancelEdit}>취소</S.CancelButton>
                      </S.ButtonGroup>
                    </S.EditInputWrapper>
                  ) : (
                    <S.CommentContent>{comment.content}</S.CommentContent>
                  )}

                  {/* 대댓글 입력 UI */}
                  {props.replyingToCommentId === comment.id && (
                    <S.ReplyInputWrapper>
                      <S.ReplyInput
                        value={props.replyContent}
                        onChange={(e) => props.onReplyContentChange(e.target.value)}
                        placeholder="대댓글을 작성하세요..."
                      />
                      <S.ReplyButtonGroup>
                        <S.ReplySubmitButton 
                          onClick={props.onSubmitReply}
                          disabled={!props.replyContent.trim()}
                        >
                          댓글 작성
                        </S.ReplySubmitButton>
                        <S.ReplyCancelButton onClick={props.onCancelReply}>
                          취소
                        </S.ReplyCancelButton>
                      </S.ReplyButtonGroup>
                    </S.ReplyInputWrapper>
                  )}

                  {/* 대댓글 보기 버튼 */}
                  {comment.reply_count !== undefined && comment.reply_count > 0 && (
                    <S.ReplyWrapper style={{ marginTop: "0.5rem" }}>
                      {props.showingRepliesFor === comment.id ? (
                        <S.ToggleReplyButton onClick={() => props.onHideReplies(comment.id)}>
                          ↑ 댓글 숨기기
                        </S.ToggleReplyButton>
                      ) : (
                        <S.ToggleReplyButton onClick={() => props.onShowReplies(comment.id)}>
                          ↓ 댓글 ({comment.reply_count}개)
                        </S.ToggleReplyButton>
                      )}
                    </S.ReplyWrapper>
                  )}

                  {/* 대댓글 목록 */}
                  {props.showingRepliesFor === comment.id && props.replies[comment.id] && props.replies[comment.id].length > 0 && (
                    <S.ReplyWrapper>
                      {props.replies[comment.id].map((reply) => (
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
                                props.getInitials(reply.profile_nickname)
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
                              {props.formatTimestamp(reply.created_at)}
                            </span>
                            {props.isLogin && (
                              <div style={{ marginLeft: "auto", display: "flex" }}>
                                {(props.isCommentAuthor(reply.user_id) || props.isAdmin) && (
                                  <>
                                    <S.ReplyActionButton onClick={() => props.onEditComment(reply)}>
                                      수정
                                    </S.ReplyActionButton>
                                    <S.ReplyActionButton onClick={() => props.onDeleteComment(reply.id)}>
                                      삭제
                                    </S.ReplyActionButton>
                                  </>
                                )}
                                {!props.isCommentAuthor(reply.user_id) && !props.isAdmin && (
                                  <S.ReplyActionButton onClick={() => props.onReportClick(reply.id)}>
                                    신고
                                  </S.ReplyActionButton>
                                )}
                              </div>
                            )}
                          </S.ReplyHeader>
                          
                          {props.editingCommentId === reply.id ? (
                            <S.ReplyEditWrapper>
                              <S.ReplyEditInput
                                value={props.editContent}
                                onChange={(e) => props.onEditContentChange(e.target.value)}
                                placeholder="대댓글을 수정하세요..."
                              />
                              <S.ReplyEditButtonGroup>
                                <S.ReplyEditSaveButton onClick={props.onSaveEdit}>
                                  저장
                                </S.ReplyEditSaveButton>
                                <S.ReplyEditCancelButton onClick={props.onCancelEdit}>
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
                  {props.showingRepliesFor === comment.id && (!props.replies[comment.id] || props.replies[comment.id].length === 0) && (
                    <S.NoReply>
                      아직 대댓글이 없습니다.
                    </S.NoReply>
                  )}
                </S.CommentItem>
              );
            })
          )}
        </S.CommentList>

        {props.hasMoreComments && (
          <S.ShowMoreButton onClick={props.showAllComments ? props.onShowLessComments : props.onShowMoreComments}>
            {props.showAllComments ? "댓글 접기" : `댓글 더보기`}
          </S.ShowMoreButton>
        )}
      </S.FreeBoardCommentWrapper>

      {props.isModalOpen && (
        <S.ModalOverlay onClick={props.onCloseModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <h3>댓글 작성</h3>
              <button className="close-button" onClick={props.onCloseModal}>
                ×
              </button>
            </S.ModalHeader>
            
            <S.ModalBody>
              <S.CommentInput
                value={props.newComment}
                onChange={(e) => props.onNewCommentChange(e.target.value)}
                placeholder="댓글을 작성하세요..."
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) {
                    props.onSubmitComment();
                  }
                }}
              />
            </S.ModalBody>
            
            <S.ModalFooter>
              <button className="cancel" onClick={props.onCloseModal}>
                취소
              </button>
              <button 
                className="submit" 
                onClick={props.onSubmitComment}
                disabled={!props.newComment.trim()}
              >
                댓글 작성
              </button>
            </S.ModalFooter>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {/* 신고 모달 */}
      {props.showReportModal && (
        <S.ReportModalOverlay onClick={props.onCloseReportModal}>
          <S.ReportModalContent onClick={(e) => e.stopPropagation()}>
            <S.ReportModalTitle>댓글 신고</S.ReportModalTitle>
            <S.ReportModalText>
              신고 사유를 선택해주세요. 신고된 댓글은 검토 후 처리됩니다.
            </S.ReportModalText>
            <S.ReportReasonSelect
              value={props.selectedReportReason}
              onChange={props.onReportReasonChange}
            >
              <option value="">신고 사유를 선택하세요</option>
              <option value="욕설">욕설</option>
              <option value="광고">광고</option>
              <option value="도배">도배</option>
              <option value="부적절한 사진">부적절한 사진</option>
              <option value="기타">기타</option>
            </S.ReportReasonSelect>
            <S.ReportModalButtonGroup>
              <S.ReportModalButton onClick={props.onCloseReportModal}>
                취소
              </S.ReportModalButton>
              <S.ReportModalButton 
                $primary 
                onClick={props.onSubmitReport}
                disabled={!props.selectedReportReason}
              >
                신고하기
              </S.ReportModalButton>
            </S.ReportModalButtonGroup>
          </S.ReportModalContent>
        </S.ReportModalOverlay>
      )}
    </>
  );
};

export default FreeBoardCommentPresenter;