"use client"

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FreeBoardDetailPresenter from "./FreeBoardDetail.presenter";
import { FreeBoardDetailPost, FreeBoardDetailPresenterProps } from "./FreeBoardDetail.types";
import { deleteFreeBoardWriteQuery, getFreeBoardDetailQuery, reportFreeBoardPostQuery } from "./FreeBoardDetail.query";
import { useAuth } from "@/context/AuthContext";

export const FreeBoardDetailContainer = () => {
  const [post, setPost] = useState<FreeBoardDetailPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const { isAdmin } = useAuth();

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        
        const response = await getFreeBoardDetailQuery(parseInt(postId));
        setPost(response);
        
        if (userId === response.user_id) {
          setIsLogin(true);
          setIsAuthor(true);
        } else if (userId) {
          setIsLogin(true);
          setIsAuthor(false);
        }
      } catch (error) {
        console.error("게시글 조회 오류:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, userId]);

  const formatDate:FreeBoardDetailPresenterProps["formatDate"] = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBackToList:FreeBoardDetailPresenterProps["onBackToList"] = () => {
    router.push("/freeBoardList");
  };

  const handleEdit:FreeBoardDetailPresenterProps["onEdit"] = () => {
    if (post) {
      router.push(`/freeBoardEdit?status=true&id=${post.id}`);
    }
  };

  const onDelete:FreeBoardDetailPresenterProps["onDelete"] = async () => {
    if (post && window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      await deleteFreeBoardWriteQuery(post.id);
      alert("게시글이 삭제되었습니다.");
      router.push("/freeBoardList");
    }
  };

  // 신고 관련 핸들러들
  const handleReportClick:FreeBoardDetailPresenterProps["onReportClick"] = () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    setShowReportModal(true);
  };

  const handleCloseReportModal:FreeBoardDetailPresenterProps["onCloseReportModal"] = () => {
    setShowReportModal(false);
    setSelectedReportReason("");
  };

  const handleReportReasonChange:FreeBoardDetailPresenterProps["onReportReasonChange"] = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReportReason(e.target.value);
  };

  const handleSubmitReport:FreeBoardDetailPresenterProps["onSubmitReport"] = async () => {
    if (!post || !selectedReportReason || !token) {
      return;
    }

    try {
      const data = await reportFreeBoardPostQuery(post.id, selectedReportReason);

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

  return (
    <FreeBoardDetailPresenter
      post={post}
      loading={loading}
      onBackToList={handleBackToList}
      onEdit={handleEdit}
      onDelete={onDelete}
      formatDate={formatDate}
      isLogin={isLogin}
      isAuthor={isAuthor}
      isAdmin={isAdmin}
      showReportModal={showReportModal}
      selectedReportReason={selectedReportReason}
      onReportClick={handleReportClick}
      onCloseReportModal={handleCloseReportModal}
      onReportReasonChange={handleReportReasonChange}
      onSubmitReport={handleSubmitReport}
    />
  );
};

export default FreeBoardDetailContainer;
