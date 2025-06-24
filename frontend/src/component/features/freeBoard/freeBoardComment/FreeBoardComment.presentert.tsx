import React from "react";
import * as S from "./FreeBoardComment.styled";
import { FreeBoardCommentProps, Comment, FreeBoardCommentPresenterProps } from "./FreeBoardComment.types";

export const FreeBoardCommentPresenter: React.FC<FreeBoardCommentPresenterProps> = ({
  comments = [],
  isLoading = false,
  isModalOpen,
  newComment,
  editingCommentId,
  editContent,
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
  formatTimestamp,
  getInitials,
  hasMoreComments,
  showAllComments,
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
            comments.map((comment) => (
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
                    <button onClick={() => onEditComment(comment)}>
                      수정
                    </button>
                    <button onClick={() => onDeleteComment(comment.post_id)}>
                      삭제
                    </button>
                    <button onClick={() => onReplyComment(comment.post_id)}>
                      답글
                    </button>
                  </S.CommentActions>
                </S.CommentHeaderInfo>
                
                {editingCommentId === comment.post_id ? (
                  <div style={{ marginLeft: "3.5rem" }}>
                    <S.CommentInput
                      value={editContent}
                      onChange={(e) => onEditContentChange(e.target.value)}
                      placeholder="댓글을 수정하세요..."
                    />
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                      <button
                        onClick={onSaveEdit}
                        style={{
                          background: "#667eea",
                          color: "white",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        저장
                      </button>
                      <button
                        onClick={onCancelEdit}
                        style={{
                          background: "#666",
                          color: "white",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <S.CommentContent>{comment.content}</S.CommentContent>
                )}
              </S.CommentItem>
            ))
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