import React from "react";
import * as S from "./DripPostComment.styled";
import { Heart, MessageCircle, MoreVertical } from "lucide-react";
import { DripPostCommentPresenterProps } from "./DripPostComment.types";
import { formatDate } from "./DripPostComment.container";
import { getProfileImageUrl } from "@/utils/imageUtils";

const DripPostCommentPresenter = (props: DripPostCommentPresenterProps) => {

  return (
    <S.CommentSection>
      <S.CommentHeader>
        <S.CommentTitle>댓글</S.CommentTitle>
        <S.CommentCount>{props.commentList.length}개</S.CommentCount>
      </S.CommentHeader>

      <S.CommentList>
        {props.commentList.length === 0 ? (
          <S.EmptyState>
            <div className="empty-icon">💬</div>
            <p className="empty-text">아직 댓글이 없습니다.<br />첫 번째 댓글을 남겨보세요!</p>
          </S.EmptyState>
        ) : (
          props.commentList.map((comment) => (
            <S.CommentItem key={comment.id}>
              <S.UserProfileImage 
                src={getProfileImageUrl(comment.profile_image) || undefined} 
                alt={comment.profile_nickname} 
              />
              <S.CommentBody>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <S.UserName>{comment.profile_nickname}</S.UserName>
                </div>
                  <S.CommentText>{comment.content}</S.CommentText>
                <S.CommentMeta>
                  <S.CommentDate>{formatDate(comment.created_at)}</S.CommentDate>
                  <S.CommentLikeButton 
                    $isLiked={comment.liked} 
                    onClick={() => props.onLikeComment(comment.id)}
                  >
                    <Heart size={16} fill={comment.liked ? "#ff3b3b" : "none"} color={comment.liked ? "#ff3b3b" : "#aaa"} />
                    {comment.like_count}
                  </S.CommentLikeButton>
                  <S.ReplyButton onClick={() => {
                    props.onReplyClick(comment.id);
                    props.onOpenModal();  // 모달 열기
                  }}>
                    <MessageCircle size={16} />
                  </S.ReplyButton>
                  <S.MenuButtonWrapper>
                    <button type="button" onClick={() => props.handleMenuOpen(comment.id)}>
                      <MoreVertical size={16} color="#aaa"/>
                    </button>
                    {props.activeMenuId === comment.id && (
                      <S.Menu>
                        {props.myUserId === comment.user_id && (
                          <S.MenuItem onClick={() => {
                            props.onEditComment(comment.id);
                            props.handleMenuOpen(0);
                          }}>수정</S.MenuItem>
                        )}
                        {(props.myUserId === comment.user_id || props.isAdmin) && (
                          <S.MenuItem onClick={() => {
                            props.onDeleteComment(comment.id);
                            props.handleMenuOpen(0);
                          }}>삭제</S.MenuItem>
                        )}
                        {props.myUserId !== comment.user_id && !props.isAdmin && (
                          <S.MenuItem onClick={() => {
                            props.onOpenReportModal(comment.id);
                            props.handleMenuOpen(0);
                          }}>신고</S.MenuItem>
                        )}
                      </S.Menu>
                    )}
                  </S.MenuButtonWrapper>
                </S.CommentMeta>

                {/* 답글 보기/숨기기 버튼 */}
                {comment.replies && comment.replies.length > 0 && (
                  <S.ShowRepliesButton onClick={() => props.toggleReplies(comment.id)}>
                    {props.expandedReplies[comment.id] ? "↑ 댓글 숨기기" : `↓ 댓글 ${comment.replies.length}개`}
                  </S.ShowRepliesButton>
                )}

                {/* 대댓글 */}
                {props.expandedReplies[comment.id] && comment.replies && comment.replies.length > 0 && (
                  <S.ReplyList>
                    {comment.replies.map((reply) => (
                      <S.ReplyItem key={reply.id}>
                        <S.UserProfileImage 
                          src={getProfileImageUrl(reply.profile_image) || undefined} 
                          alt={reply.profile_nickname} 
                          $small 
                        />
                        <S.CommentBody>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <S.UserName>{reply.profile_nickname}</S.UserName>
                            <S.CommentText>{reply.content}</S.CommentText>
                          </div>
                          <S.CommentMeta>
                            <S.CommentDate>{formatDate(reply.created_at)}</S.CommentDate>
                            <S.CommentLikeButton 
                              $isLiked={reply.liked} 
                              onClick={() => props.onLikeComment(reply.id)}
                            >
                              <Heart size={16} fill={reply.liked ? "#ff3b3b" : "none"} color={reply.liked ? "#ff3b3b" : "#aaa"} />
                              {reply.like_count}
                            </S.CommentLikeButton>
                            <S.MenuButtonWrapper>
                              <button type="button" onClick={() => props.handleMenuOpen(reply.id)}>
                                <MoreVertical size={16} />
                              </button>
                              {props.activeMenuId === reply.id && (
                                <S.Menu>
                                  {props.myUserId === reply.user_id && (
                                    <S.MenuItem onClick={() => {
                                      const replyContent = reply.content;
                                      props.setEditContent(replyContent);
                                      props.onEditComment(reply.id);
                                      props.handleMenuOpen(0);
                                    }}>수정</S.MenuItem>
                                  )}
                                  {(props.myUserId === reply.user_id || props.isAdmin) && (
                                    <S.MenuItem onClick={() => {
                                      props.onDeleteComment(reply.id);
                                      props.handleMenuOpen(0);
                                    }}>삭제</S.MenuItem>
                                  )}
                                  {props.myUserId !== reply.user_id && !props.isAdmin && (
                                    <S.MenuItem onClick={() => {
                                      props.onOpenReportModal(reply.id);
                                      props.handleMenuOpen(0);
                                    }}>신고</S.MenuItem>
                                  )}
                                </S.Menu>
                              )}
                            </S.MenuButtonWrapper>
                          </S.CommentMeta>
                        </S.CommentBody>
                      </S.ReplyItem>
                    ))}
                  </S.ReplyList>
                )}
              </S.CommentBody>
            </S.CommentItem>
          ))
        )}
      </S.CommentList>

      {/* 답글 작성 모달 */}
      {props.isModalOpen && props.replyingToId && (
        <S.ModalOverlay onClick={props.onCloseModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>답글 작성</S.ModalTitle>
              <S.CloseButton onClick={props.onCloseModal}>&times;</S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              <S.ModalTextArea
                value={props.replyContent}
                onChange={(e) => props.onChangeReply(e.target.value)}
                placeholder="답글을 입력하세요"
                autoFocus
                maxLength={100}
              />
              <div style={{textAlign: 'right', color: '#aaa', fontSize: '0.85rem', marginTop: '0.3rem'}}>
                {props.replyContent.length}/100
              </div>
            </S.ModalBody>
            <S.ModalFooter>
              <S.ModalButton onClick={props.onCloseModal}>취소</S.ModalButton>
              <S.ModalButton onClick={props.onSubmitReply}>답글 작성</S.ModalButton>
            </S.ModalFooter>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {/* 댓글 작성 모달 */}
      {props.isModalOpen && !props.replyingToId && (
        <S.ModalOverlay onClick={props.onCloseModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>댓글 작성</S.ModalTitle>
              <S.CloseButton onClick={props.onCloseModal}>&times;</S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              <S.ModalTextArea
                value={props.newComment}
                onChange={(e) => props.setNewComment(e.target.value)}
                placeholder="댓글을 입력해주세요."
                autoFocus
                maxLength={100}
              />
              <div style={{textAlign: 'right', color: '#aaa', fontSize: '0.85rem', marginTop: '0.3rem'}}>
                {props.newComment.length}/100
              </div>
            </S.ModalBody>
            <S.ModalFooter>
              <S.ModalButton onClick={props.onCloseModal}>취소</S.ModalButton>
              <S.ModalButton onClick={props.onCommentSubmit}>작성</S.ModalButton>
            </S.ModalFooter>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {/* 수정 모달 */}
      {props.editingCommentId !== null && (
        <S.ModalOverlay onClick={props.onEditCancel}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>
                {props.commentList.some(comment => comment.id === props.editingCommentId) 
                  ? "댓글 수정" 
                  : "답글 수정"}
              </S.ModalTitle>
              <S.CloseButton onClick={props.onEditCancel}>&times;</S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              <S.ModalTextArea
                value={props.editContent}
                onChange={(e) => props.setEditContent(e.target.value)}
                placeholder={
                  props.commentList.some(comment => comment.id === props.editingCommentId)
                    ? "댓글을 수정하세요"
                    : "답글을 수정하세요"
                }
                autoFocus
                maxLength={100}
              />
              <div style={{textAlign: 'right', color: '#aaa', fontSize: '0.85rem', marginTop: '0.3rem'}}>
                {props.editContent.length}/100
              </div>
            </S.ModalBody>
            <S.ModalFooter>
              <S.ModalButton onClick={props.onEditCancel}>취소</S.ModalButton>
              <S.ModalButton onClick={() => {
                props.onEditSubmit();
                props.handleMenuOpen(0);
              }}>수정</S.ModalButton>
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
              value={props.reportReason}
              onChange={(e) => props.onChangeReportReason(e.target.value)}
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
                onClick={props.onReportSubmit}
                disabled={!props.reportReason}
              >
                신고하기
              </S.ReportModalButton>
            </S.ReportModalButtonGroup>
          </S.ReportModalContent>
        </S.ReportModalOverlay>
      )}
    </S.CommentSection>
  );
};

export default DripPostCommentPresenter;
