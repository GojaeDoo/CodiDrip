"use client";
import React, { useEffect, useState } from "react";
import FreeBoardCommentPresenter from "./FreeBoardComment.presentert";
import { Comment, FreeBoardCommentPresenterProps } from "./FreeBoardComment.types";
import * as S from "./FreeBoardComment.styled";
import { useSearchParams } from "next/navigation";
import { getFreeBoardCommentQuery, postFreeBoardCommentQuery, updateFreeBoardCommentQuery, deleteFreeBoardCommentQuery, postFreeBoardReplyQuery, getFreeBoardRepliesQuery, reportFreeBoardCommentQuery } from "./FreeBoardComment.query";
import { useAuth } from "@/context/AuthContext";

interface FreeBoardCommentContainerProps {
  withBackground?: boolean;
}

export const FreeBoardCommentContainer: React.FC<FreeBoardCommentContainerProps> = ({ 
  withBackground = true 
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const isLoading = false;
  const [isLogin, setIsLogin] = useState(false);
  const { isAdmin } = useAuth();
  
  // 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  
  // 댓글 수정 관련 상태
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  
  // 대댓글 관련 상태
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [showingRepliesFor, setShowingRepliesFor] = useState<string | null>(null);
  const [replies, setReplies] = useState<{ [commentId: string]: Comment[] }>({});
  
  // 더보기 관련 상태
  const [showAllComments, setShowAllComments] = useState(false);
  const COMMENTS_PER_PAGE = 5;

  // 신고 관련 상태
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState("");
  const [reportingCommentId, setReportingCommentId] = useState<string | null>(null);

  // 댓글 작성 시 필요한 정보
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  


  useEffect(()=>{
    const isLoginValue = localStorage.getItem("userId");
    if(isLoginValue){
      setIsLogin(true);
    }else{
      setIsLogin(false);
    }
    const getFreeBoardComment = async () => {
      try {
        const response = await getFreeBoardCommentQuery(id);
        setComments(response);
      } catch {
        console.error("댓글 조회 실패");
      }
    }
    getFreeBoardComment();
  },[id])

  // 유틸리티 함수들
  const formatTimestamp:FreeBoardCommentPresenterProps["formatTimestamp"] = (timestamp: string) => {
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

  const getInitials:FreeBoardCommentPresenterProps["getInitials"] = (username: string) => {
    if (!username) return "??";
    return username.slice(0, 2).toUpperCase();
  };

  const isCommentAuthor:FreeBoardCommentPresenterProps["isCommentAuthor"] = (commentUserId: string) => {
    if (!userId) return false;
    return String(userId) === String(commentUserId);
  };

  // 모달 관련 핸들러
  const handleOpenModal:FreeBoardCommentPresenterProps["onOpenModal"] = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal:FreeBoardCommentPresenterProps["onCloseModal"] = () => {
    setIsModalOpen(false);
    setNewComment("");
  };

  // 댓글 작성 핸들러
  const handleNewCommentChange:FreeBoardCommentPresenterProps["onNewCommentChange"] = (value: string) => {
    setNewComment(value);
  };

  const handleSubmitComment:FreeBoardCommentPresenterProps["onSubmitComment"] = async() => {
    try {
      await postFreeBoardCommentQuery(newComment, userId, id);
      setIsModalOpen(false);
      setNewComment("");
      const updatedComments = await getFreeBoardCommentQuery(id);
      setComments(updatedComments);
    } catch {
      console.error("댓글 작성 실패");
    }
  };

  // 댓글 수정 핸들러
  const handleEditComment:FreeBoardCommentPresenterProps["onEditComment"] = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditContentChange:FreeBoardCommentPresenterProps["onEditContentChange"] = (value: string) => {
    setEditContent(value);
  };

  const handleSaveEdit:FreeBoardCommentPresenterProps["onSaveEdit"] = async () => {
    if (editContent.trim() && editingCommentId) {
      try {
        await updateFreeBoardCommentQuery(editingCommentId, editContent.trim(), userId);
        
        // 댓글 리스트 새로고침
        const updatedComments = await getFreeBoardCommentQuery(id);
        setComments(updatedComments);
        
        // 대댓글 수정인 경우 해당 대댓글 목록도 새로고침
        if (showingRepliesFor) {
          const updatedReplies = await getFreeBoardRepliesQuery(showingRepliesFor);
          setReplies(prev => ({
            ...prev,
            [showingRepliesFor]: updatedReplies
          }));
        }
        
        setEditingCommentId(null);
        setEditContent("");
      } catch {
        console.error("댓글 수정 실패");
      }
    }
  };

  const handleCancelEdit:FreeBoardCommentPresenterProps["onCancelEdit"] = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment:FreeBoardCommentPresenterProps["onDeleteComment"] = async (commentId: string) => {
    try {
      await deleteFreeBoardCommentQuery(commentId, userId);
      
      // 댓글 리스트 새로고침
      const updatedComments = await getFreeBoardCommentQuery(id);
      setComments(updatedComments);
      
      // 대댓글 삭제인 경우 해당 대댓글 목록도 새로고침
      if (showingRepliesFor) {
        const updatedReplies = await getFreeBoardRepliesQuery(showingRepliesFor);
        setReplies(prev => ({
          ...prev,
          [showingRepliesFor]: updatedReplies
        }));
      }
    } catch {
      console.error("댓글 삭제 실패");
    }
  };

  // 대댓글 관련 핸들러
  const handleReplyComment:FreeBoardCommentPresenterProps["onReplyComment"] = (commentId: string) => {
    setReplyingToCommentId(commentId);
    setReplyContent("");
  };

  const handleCancelReply:FreeBoardCommentPresenterProps["onCancelReply"] = () => {
    setReplyingToCommentId(null);
    setReplyContent("");
  };

  const handleReplyContentChange:FreeBoardCommentPresenterProps["onReplyContentChange"] = (value: string) => {
    setReplyContent(value);
  };

  const handleSubmitReply:FreeBoardCommentPresenterProps["onSubmitReply"] = async () => {
    if (replyContent.trim() && replyingToCommentId) {
      try {
        await postFreeBoardReplyQuery(replyContent.trim(), userId, id, replyingToCommentId);
        
        const updatedComments = await getFreeBoardCommentQuery(id);

        setComments(updatedComments);
        
        // 대댓글 목록도 새로고침
        if (showingRepliesFor === replyingToCommentId) {
          const updatedReplies = await getFreeBoardRepliesQuery(replyingToCommentId);
          setReplies(prev => ({
            ...prev,
            [replyingToCommentId]: updatedReplies
          }));
        }
        
        setReplyingToCommentId(null);
        setReplyContent("");
      } catch {
        console.error("대댓글 작성 실패");
      }
    }
  };

  // 대댓글 보기 핸들러
  const handleShowReplies:FreeBoardCommentPresenterProps["onShowReplies"] = async (commentId: string) => {
    try {

      const repliesData = await getFreeBoardRepliesQuery(commentId);

      setReplies(prev => ({
        ...prev,
        [commentId]: repliesData
      }));
      setShowingRepliesFor(commentId);
    } catch {
      console.error("대댓글 조회 실패");
    }
  };

  const handleHideReplies:FreeBoardCommentPresenterProps["onHideReplies"] = () => {
    setShowingRepliesFor(null);
  };

  // 더보기 핸들러
  const handleShowMoreComments:FreeBoardCommentPresenterProps["onShowMoreComments"] = () => {
    setShowAllComments(true);
  };

  const handleShowLessComments:FreeBoardCommentPresenterProps["onShowLessComments"] = () => {
    setShowAllComments(false);
  };

  // 표시할 댓글 필터링
  const displayedComments = showAllComments 
    ? comments 
    : comments.slice(0, COMMENTS_PER_PAGE);
  
  const hasMoreComments = comments.length > COMMENTS_PER_PAGE;

  // 신고 관련 핸들러들
  const handleReportClick:FreeBoardCommentPresenterProps["onReportClick"] = (commentId: string) => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    setReportingCommentId(commentId);
    setShowReportModal(true);
  };

  const handleCloseReportModal:FreeBoardCommentPresenterProps["onCloseReportModal"] = () => {
    setShowReportModal(false);
    setSelectedReportReason("");
    setReportingCommentId(null);
  };

  const handleReportReasonChange:FreeBoardCommentPresenterProps["onReportReasonChange"] = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReportReason(e.target.value);
  };

  const handleSubmitReport:FreeBoardCommentPresenterProps["onSubmitReport"] = async () => {
    if (!reportingCommentId || !selectedReportReason || !token) {
      return;
    }

    try {
      const data = await reportFreeBoardCommentQuery(reportingCommentId, selectedReportReason);

      if (data.success) {
        alert("신고가 성공적으로 접수되었습니다.");
        handleCloseReportModal();
      } else {
        alert(data.message || "신고 처리 중 오류가 발생했습니다.");
      }
    } catch {
      console.error("신고 오류");
      alert("신고 처리 중 오류가 발생했습니다.");
    }
  };

  const presenterContent = (
    <FreeBoardCommentPresenter
      comments={displayedComments}
      isLoading={isLoading}
      isModalOpen={isModalOpen}
      newComment={newComment}
      editingCommentId={editingCommentId}
      editContent={editContent}
      replyingToCommentId={replyingToCommentId}
      replyContent={replyContent}
      showingRepliesFor={showingRepliesFor}
      replies={replies}
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
      onReplyComment={handleReplyComment}
      onCancelReply={handleCancelReply}
      onReplyContentChange={handleReplyContentChange}
      onSubmitReply={handleSubmitReply}
      onShowReplies={handleShowReplies}
      onHideReplies={handleHideReplies}
      formatTimestamp={formatTimestamp}
      getInitials={getInitials}
      hasMoreComments={hasMoreComments}
      showAllComments={showAllComments}
      isLogin={isLogin}
      isCommentAuthor={isCommentAuthor}
      isAdmin={isAdmin}
      showReportModal={showReportModal}
      selectedReportReason={selectedReportReason}
      onReportClick={handleReportClick}
      onCloseReportModal={handleCloseReportModal}
      onReportReasonChange={handleReportReasonChange}
      onSubmitReport={handleSubmitReport}
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