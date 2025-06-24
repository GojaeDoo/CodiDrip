"use client";
import React, { useEffect, useState } from "react";
import FreeBoardCommentPresenter from "./FreeBoardComment.presentert";
import { Comment } from "./FreeBoardComment.types";
import * as S from "./FreeBoardComment.styled";
import { useSearchParams } from "next/navigation";
import { getFreeBoardCommentQuery, postFreeBoardCommentQuery } from "./FreeBoardComment.query";

interface FreeBoardCommentContainerProps {
  withBackground?: boolean;
}

export const FreeBoardCommentContainer: React.FC<FreeBoardCommentContainerProps> = ({ 
  withBackground = true 
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  // 임시로 넣어본 더미 데이터
  const isLoading = false;
  
  // 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  
  // 댓글 수정 관련 상태
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  
  // 더보기 관련 상태
  const [showAllComments, setShowAllComments] = useState(false);
  const COMMENTS_PER_PAGE = 5;

  // 댓글 작성 시 필요한 정보
  const userId = localStorage.getItem("userId");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(()=>{
    const getFreeBoardComment = async () => {
      try {
        const response = await getFreeBoardCommentQuery(id);
        console.log("댓글조회 : " + JSON.stringify(response));
        setComments(response);
      } catch (error) {
        console.log("댓글 조회 오류 : " + error);
      }
    }
    getFreeBoardComment();
  },[id])

  // 유틸리티 함수들
  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return "시간 정보 없음";
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return "방금 전";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}시간 전`;
    } else {
      return date.toLocaleDateString("ko-KR");
    }
  };

  const getInitials = (username: string) => {
    if (!username) return "??";
    return username.slice(0, 2).toUpperCase();
  };

  // 모달 관련 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewComment("");
  };

  // 댓글 작성 핸들러
  const handleNewCommentChange = (value: string) => {
    setNewComment(value);
  };

  const handleSubmitComment = async() => {
    try {
      const response = await postFreeBoardCommentQuery(newComment, userId, id);
      console.log(response);
      
      // 댓글 작성 성공 후 모달 닫기
      setIsModalOpen(false);
      setNewComment("");
      
      // 댓글 리스트 새로고침
      const updatedComments = await getFreeBoardCommentQuery(id);
      setComments(updatedComments);
    } catch (error) {
      console.log("댓글 작성 오류 : " + error)
    }
  };

  // 댓글 수정 핸들러
  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.post_id);
    setEditContent(comment.content);
  };

  const handleEditContentChange = (value: string) => {
    setEditContent(value);
  };

  const handleSaveEdit = () => {
    if (editContent.trim() && editingCommentId) {
      setComments(prev => 
        prev.map(comment => 
          comment.post_id === editingCommentId 
            ? { ...comment, content: editContent.trim() } 
            : comment
        )
      );
      setEditingCommentId(null);
      setEditContent("");
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  // 더보기 핸들러
  const handleShowMoreComments = () => {
    setShowAllComments(true);
  };

  const handleShowLessComments = () => {
    setShowAllComments(false);
  };

  // 표시할 댓글 필터링
  const displayedComments = showAllComments 
    ? comments 
    : comments.slice(0, COMMENTS_PER_PAGE);
  
  const hasMoreComments = comments.length > COMMENTS_PER_PAGE;

  const presenterContent = (
    <FreeBoardCommentPresenter
      comments={displayedComments}
      isLoading={isLoading}
      isModalOpen={isModalOpen}
      newComment={newComment}
      editingCommentId={editingCommentId}
      editContent={editContent}
      onOpenModal={handleOpenModal}
      onCloseModal={handleCloseModal}
      onNewCommentChange={handleNewCommentChange}
      onSubmitComment={handleSubmitComment}
      onEditComment={handleEditComment}
      onSaveEdit={handleSaveEdit}
      onCancelEdit={handleCancelEdit}
      onEditContentChange={handleEditContentChange}
      onDeleteComment={handleDeleteComment}
      onShowMoreComments={handleShowMoreComments}
      onShowLessComments={handleShowLessComments}
      formatTimestamp={formatTimestamp}
      getInitials={getInitials}
      hasMoreComments={hasMoreComments}
      showAllComments={showAllComments}
    />
  );

  return withBackground ? (
    <S.Background>
      {presenterContent}
    </S.Background>
  ) : (
    presenterContent
  );
};

export default FreeBoardCommentContainer;