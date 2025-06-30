"use client";
import React, { useEffect, useState } from "react";
import FreeBoardCommentPresenter from "./FreeBoardComment.presentert";
import { Comment } from "./FreeBoardComment.types";
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
        console.log("댓글조회 : " + JSON.stringify(response));
        console.log("댓글 데이터 상세:", response.map((comment: Comment) => ({ 
          id: comment.id, 
          user_id: comment.user_id, 
          content: comment.content,
          reply_count: comment.reply_count
        })));
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

  const isCommentAuthor = (commentUserId: string) => {
    if (!userId) return false;
    return String(userId) === String(commentUserId);
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
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditContentChange = (value: string) => {
    setEditContent(value);
  };

  const handleSaveEdit = async () => {
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
      } catch (error) {
        console.log("댓글 수정 오류 : " + error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId: string) => {
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
    } catch (error) {
      console.log("댓글 삭제 오류 : " + error);
    }
  };

  // 대댓글 관련 핸들러
  const handleReplyComment = (commentId: string) => {
    setReplyingToCommentId(commentId);
    setReplyContent("");
  };

  const handleCancelReply = () => {
    setReplyingToCommentId(null);
    setReplyContent("");
  };

  const handleReplyContentChange = (value: string) => {
    setReplyContent(value);
  };

  const handleSubmitReply = async () => {
    if (replyContent.trim() && replyingToCommentId) {
      try {
        console.log("대댓글 작성 시작:", { replyContent, userId, id, replyingToCommentId });
        const response = await postFreeBoardReplyQuery(replyContent.trim(), userId, id, replyingToCommentId);
        console.log("대댓글 작성 응답:", response);
        
        // 댓글 리스트 새로고침 (대댓글 개수 포함)
        const updatedComments = await getFreeBoardCommentQuery(id);
        console.log("업데이트된 댓글 목록:", updatedComments);
        setComments(updatedComments);
        
        // 대댓글 목록도 새로고침
        if (showingRepliesFor === replyingToCommentId) {
          const updatedReplies = await getFreeBoardRepliesQuery(replyingToCommentId);
          console.log("업데이트된 대댓글 목록:", updatedReplies);
          setReplies(prev => ({
            ...prev,
            [replyingToCommentId]: updatedReplies
          }));
        }
        
        setReplyingToCommentId(null);
        setReplyContent("");
      } catch (error) {
        console.log("대댓글 작성 오류 : " + error);
      }
    }
  };

  // 대댓글 보기 핸들러
  const handleShowReplies = async (commentId: string) => {
    try {
      console.log("대댓글 조회 시작:", commentId);
      const repliesData = await getFreeBoardRepliesQuery(commentId);
      console.log("조회된 대댓글 데이터:", repliesData);
      setReplies(prev => ({
        ...prev,
        [commentId]: repliesData
      }));
      setShowingRepliesFor(commentId);
    } catch (error) {
      console.log("대댓글 조회 오류 : " + error);
    }
  };

  const handleHideReplies = (commentId: string) => {
    setShowingRepliesFor(null);
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

  // 신고 관련 핸들러들
  const handleReportClick = (commentId: string) => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    setReportingCommentId(commentId);
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setSelectedReportReason("");
    setReportingCommentId(null);
  };

  const handleReportReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReportReason(e.target.value);
  };

  const handleSubmitReport = async () => {
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
    } catch (error) {
      console.error("신고 오류:", error);
      if (error instanceof Error && error.message === '로그인이 필요합니다.') {
        alert('로그인이 필요합니다.');
      } else {
        alert("신고 처리 중 오류가 발생했습니다.");
      }
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