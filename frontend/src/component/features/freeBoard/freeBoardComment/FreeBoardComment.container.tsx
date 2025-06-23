"use client";
import React, { useState } from "react";
import FreeBoardCommentPresenter from "./FreeBoardComment.presentert";
import { Comment } from "./FreeBoardComment.types";
import * as S from "./FreeBoardComment.styled";

interface FreeBoardCommentContainerProps {
  withBackground?: boolean;
}

export const FreeBoardCommentContainer: React.FC<FreeBoardCommentContainerProps> = ({ 
  withBackground = true 
}) => {
  // 임시로 넣어본 더미 데이터
  const [comments, setComments] = useState<Comment[]>(
[
    {
      id: "1",
      content: "흐어어",
      username: "고재두",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      userId: "ㅁㅁㅁ"
    },
    {
      id: "2",
      content: "어어흐",
      username: "까꿍이",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      userId: "ㅌㅌㅌ"
    },
  ]
  );

  const isLoading = false;

  // 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  // 댓글 수정 관련 상태
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  // 유틸리티 함수들
  const formatTimestamp = (timestamp: string) => {
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

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const newCommentData: Comment = {
        id: Date.now().toString(),
        content: newComment.trim(),
        username: "현재 사용자", // 실제로는 로그인된 사용자 정보를 사용
        timestamp: new Date().toISOString(),
        userId: "currentUser"
      };
      
      setComments(prev => [newCommentData, ...prev]);
      setNewComment("");
      setIsModalOpen(false);
    }
  };

  // 댓글 수정 핸들러
  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditContentChange = (value: string) => {
    setEditContent(value);
  };

  const handleSaveEdit = () => {
    if (editContent.trim() && editingCommentId) {
      setComments(prev => 
        prev.map(comment => 
          comment.id === editingCommentId 
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

  const presenterContent = (
    <FreeBoardCommentPresenter
      comments={comments}
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
      formatTimestamp={formatTimestamp}
      getInitials={getInitials}
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