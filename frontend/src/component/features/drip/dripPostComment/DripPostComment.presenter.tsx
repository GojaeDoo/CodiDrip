import React from "react";
import * as S from "./DripPostComment.styled";
import { Heart, MessageCircle, MoreVertical } from "lucide-react";
import { DripPostCommentProps } from "./DripPostComment.types";
import { formatDate } from "./DripPostComment.container";

const DripPostComment = (props: DripPostCommentProps) => {
  const {
    commentList,
    onLikeComment,
    onReplyClick,
    onCommentSubmit,
    newComment,
    setNewComment,
    expandedReplies,
    toggleReplies,
    isModalOpen,
    onCloseModal,
    onOpenModal,
    activeMenuId,
    handleMenuOpen,
    onEditComment,
    onDeleteComment,
    editingCommentId,
    editContent,
    setEditContent,
    onEditSubmit,
    onEditCancel,
    myUserId,
    replyingToId,
    replyContent,
    onChangeReply,
    onSubmitReply,
  } = props;

  return (
    <S.CommentSection>
      <S.CommentHeader>
        <S.CommentTitle>댓글</S.CommentTitle>
        <S.CommentCount>{commentList.length}개</S.CommentCount>
      </S.CommentHeader>

      <S.CommentList>
        {commentList.map((comment) => (
          <S.CommentItem key={comment.id}>
            <S.UserProfileImage 
              src={`http://localhost:3005/uploads/profiles/${comment.profile_image}`} 
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
                  onClick={() => onLikeComment(comment.id)}
                >
                  <Heart size={16} fill={comment.liked ? "#ff3b3b" : "none"} color={comment.liked ? "#ff3b3b" : "#aaa"} />
                  {comment.like_count}
                </S.CommentLikeButton>
                <S.ReplyButton onClick={() => {
                  onReplyClick(comment.id);
                  onOpenModal();  // 모달 열기
                }}>
                  <MessageCircle size={16} />
                </S.ReplyButton>
                {myUserId === comment.user_id && (
                  <>
                    <S.MenuButton onClick={() => handleMenuOpen(comment.id)}>
                      <MoreVertical size={16} />
                    </S.MenuButton>
                    {activeMenuId === comment.id && (
                      <S.Menu>
                        <S.MenuItem onClick={() => {
                          onEditComment(comment.id);
                          handleMenuOpen(0);  // 메뉴 닫기
                        }}>수정</S.MenuItem>
                        <S.MenuItem onClick={() => {
                          onDeleteComment(comment.id);
                          handleMenuOpen(0);  // 메뉴 닫기
                        }}>삭제</S.MenuItem>
                      </S.Menu>
                    )}
                  </>
                )}
              </S.CommentMeta>

              {/* 답글 보기/숨기기 버튼 */}
              {comment.replies && comment.replies.length > 0 && (
                <S.ShowRepliesButton onClick={() => toggleReplies(comment.id)}>
                  {expandedReplies[comment.id] ? "답글 숨기기" : `답글 ${comment.replies.length}개 보기`}
                </S.ShowRepliesButton>
              )}

              {/* 대댓글 */}
              {expandedReplies[comment.id] && comment.replies && comment.replies.length > 0 && (
                <S.ReplyList>
                  {comment.replies.map((reply) => (
                    <S.ReplyItem key={reply.id}>
                      <S.UserProfileImage 
                        src={`http://localhost:3005/uploads/profiles/${reply.profile_image}`} 
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
                            onClick={() => onLikeComment(reply.id)}
                          >
                            <Heart size={16} fill={reply.liked ? "#ff3b3b" : "none"} color={reply.liked ? "#ff3b3b" : "#aaa"} />
                            {reply.like_count}
                          </S.CommentLikeButton>
                          {myUserId === reply.user_id && (
                            <>
                              <S.MenuButton onClick={() => handleMenuOpen(reply.id)}>
                                <MoreVertical size={16} />
                              </S.MenuButton>
                              {activeMenuId === reply.id && (
                                <S.Menu>
                                  <S.MenuItem onClick={() => {
                                    const replyContent = reply.content;
                                    setEditContent(replyContent);
                                    onEditComment(reply.id);
                                    handleMenuOpen(0);
                                  }}>수정</S.MenuItem>
                                  <S.MenuItem onClick={() => {
                                    onDeleteComment(reply.id);
                                    handleMenuOpen(0);
                                  }}>삭제</S.MenuItem>
                                </S.Menu>
                              )}
                            </>
                          )}
                        </S.CommentMeta>
                      </S.CommentBody>
                    </S.ReplyItem>
                  ))}
                </S.ReplyList>
              )}
            </S.CommentBody>
          </S.CommentItem>
        ))}
      </S.CommentList>

      {/* 답글 작성 모달 */}
      {isModalOpen && replyingToId && (
        <S.ModalOverlay onClick={onCloseModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>답글 작성</S.ModalTitle>
              <S.CloseButton onClick={onCloseModal}>&times;</S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              <S.ModalTextArea
                value={replyContent}
                onChange={(e) => onChangeReply(e.target.value)}
                placeholder="답글을 입력하세요"
                autoFocus
              />
            </S.ModalBody>
            <S.ModalFooter>
              <S.ModalButton onClick={onCloseModal}>취소</S.ModalButton>
              <S.ModalButton onClick={onSubmitReply}>답글 작성</S.ModalButton>
            </S.ModalFooter>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {/* 댓글 작성 모달 */}
      {isModalOpen && !replyingToId && (
        <S.ModalOverlay onClick={onCloseModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>댓글 작성</S.ModalTitle>
              <S.CloseButton onClick={onCloseModal}>&times;</S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              <S.ModalTextArea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요"
                autoFocus
              />
            </S.ModalBody>
            <S.ModalFooter>
              <S.ModalButton onClick={onCloseModal}>취소</S.ModalButton>
              <S.ModalButton onClick={onCommentSubmit}>작성</S.ModalButton>
            </S.ModalFooter>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {/* 수정 모달 */}
      {editingCommentId !== null && (
        <S.ModalOverlay onClick={onEditCancel}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>
                {commentList.some(comment => comment.id === editingCommentId) 
                  ? "댓글 수정" 
                  : "답글 수정"}
              </S.ModalTitle>
              <S.CloseButton onClick={onEditCancel}>&times;</S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              <S.ModalTextArea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder={
                  commentList.some(comment => comment.id === editingCommentId)
                    ? "댓글을 수정하세요"
                    : "답글을 수정하세요"
                }
                autoFocus
              />
            </S.ModalBody>
            <S.ModalFooter>
              <S.ModalButton onClick={onEditCancel}>취소</S.ModalButton>
              <S.ModalButton onClick={() => {
                onEditSubmit();
                handleMenuOpen(0);
              }}>수정</S.ModalButton>
            </S.ModalFooter>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.CommentSection>
  );
};

export default DripPostComment;
