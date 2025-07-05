"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useQuery,  useQueryClient } from "@tanstack/react-query";
import DripPostCommentPresenter from "./DripPostComment.presenter";
import { DripPostCommentContainerProps, Comment,  ReportReasonType, DripPostCommentPresenterProps } from "./DripPostComment.types";
import { getCommentQuery, postCommentQuery, putUpdateCommentQuery, deleteCommentQuery, getLikeCommentQuery, getUnlikeCommentQuery, reportCommentQuery } from "./DripPostComment.query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DripPostCommentSkeleton from "@/component/commons/skeleton/drip/DripPostCommentSkeleton";

export const formatDate = (dateString: string) => dateString.slice(0, 10);

const organizeComments = (comments: Comment[]) => {
  const sorted = [...comments].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  const commentMap = new Map<number, Comment & { replies: Comment[] }>();
  const rootComments: (Comment & { replies: Comment[] })[] = [];
  sorted.forEach(comment => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  sorted.forEach(comment => {
    if (comment.parent_id) {
      const parentKey = Number(comment.parent_id);
      if (commentMap.has(parentKey)) {
        commentMap.get(parentKey)!.replies.push({
          ...comment,
          replies: [],
          created_at: comment.created_at.slice(0, 10),
        });
      }
    } else {
      rootComments.push(commentMap.get(comment.id)!);
    }
  });
  return rootComments;
};

function findCommentById(comments: Comment[], id: number): Comment | undefined {
  for (const comment of comments) {
    if (comment.id === id) return comment;
    if (comment.replies) {
      const found = findCommentById(comment.replies, id);
      if (found) return found;
    }
  }
  return undefined;
}

export const DripPostCommentContainer = (props: DripPostCommentContainerProps) => {
  const [commentContent, setCommentContent] = useState("");
  const [user_id, setUserId] = useState<string>("");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [expandedReplies, setExpandedReplies] = useState<{ [key: number]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 신고 관련 상태
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCommentId, setReportCommentId] = useState<number | null>(null);
  const [reportReason, setReportReason] = useState("");

  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();

  const {
    data: comments,
    isLoading,
  } = useQuery({
    queryKey: ["comments", props.postno],
    queryFn: async () => {
      const userId = localStorage.getItem("userId") ?? "";
      setUserId(userId);
      const response = await getCommentQuery(props.postno, userId);
      return organizeComments(response);
    },
  });

  const handleOpenModal:DripPostCommentPresenterProps["onOpenModal"] = useCallback(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("로그인 후 댓글을 작성해주세요.");
      router.push("/login");
      return;
    }
    setIsModalOpen(true);
  }, [router]);

  useEffect(() => {
    const handleOpenCommentModal = () => {
      handleOpenModal();
    };

    window.addEventListener('openCommentModal', handleOpenCommentModal);

    return () => {
      window.removeEventListener('openCommentModal', handleOpenCommentModal);
    };
  }, [handleOpenModal]);

  const handleCommentSubmit:DripPostCommentPresenterProps["onCommentSubmit"] = async () => {
    if (user_id === "") {
      alert("로그인 후 댓글을 작성해주세요.");
      router.push("/login");
      return;
    }

    if (commentContent === "") {
      alert("댓글을 입력해주세요.");
      return;
    }

    try {
      await postCommentQuery(props.postno, user_id, commentContent);
      setCommentContent("");
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["comments", props.postno] });
      } catch (error) {
      console.error("댓글 작성 중 에러:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
      }
    };

  const handleMenuOpen:DripPostCommentPresenterProps["handleMenuOpen"] = (commentId: number) => {
    setActiveMenuId(prev => (prev === commentId ? null : commentId));
  };

  const onEditComment:DripPostCommentPresenterProps["onEditComment"] = (commentId: number) => {
    const comment = findCommentById(comments || [], commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditContent(comment.content);
    }
    setActiveMenuId(null);
  };

  const onEditCancel:DripPostCommentPresenterProps["onEditCancel"] = () => {
    setEditingCommentId(null);
    setEditContent("");
    };

  const onEditSubmit:DripPostCommentPresenterProps["onEditSubmit"] = async () => {
    if (editingCommentId !== null) {
      await putUpdateCommentQuery(editingCommentId, editContent);
      setEditingCommentId(null);
      setEditContent("");
      queryClient.invalidateQueries({ queryKey: ["comments", props.postno] });
    }
  };
  
  const onDeleteComment:DripPostCommentPresenterProps["onDeleteComment"] = async (commentId: number) => {
    setActiveMenuId(null);
    await deleteCommentQuery(commentId);
    queryClient.invalidateQueries({ queryKey: ["comments", props.postno] });
  };

  const onLikeComment:DripPostCommentPresenterProps["onLikeComment"] = async (commentId: number) => {
    if (!user_id) return;
    const comment = findCommentById(comments || [], commentId);
    if (!comment) return;

    if (comment.liked) {
      await getUnlikeCommentQuery(commentId, user_id);
    } else {
      await getLikeCommentQuery(commentId, user_id);
    }
    queryClient.invalidateQueries({ queryKey: ["comments", props.postno] });
  };

  const onReplyClick:DripPostCommentPresenterProps["onReplyClick"] = (commentId: number) => {
    if (!user_id) {
      alert("로그인 후 답글을 작성해주세요.");
      router.push("/login");
            return;
          }
    setReplyingToId(replyingToId === commentId ? null : commentId);
    setReplyContent("");
  };

  const onChangeReply:DripPostCommentPresenterProps["onChangeReply"] = (value: string) => {
    setReplyContent(value);
  };

  const onSubmitReply:DripPostCommentPresenterProps["onSubmitReply"] = async () => {
    if (!replyContent.trim() || !user_id || !replyingToId) return;

    try {
      await postCommentQuery(props.postno, user_id, replyContent, replyingToId.toString());
      setReplyContent("");
      setReplyingToId(null);
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["comments", props.postno] });
        } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const toggleReplies:DripPostCommentPresenterProps["toggleReplies"] = (commentId: number) => {
    setExpandedReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleCloseModal:DripPostCommentPresenterProps["onCloseModal"] = () => {
    setIsModalOpen(false);
  };

  // 신고 관련 핸들러들
  const onOpenReportModal:DripPostCommentPresenterProps["onOpenReportModal"] = (commentId: number) => {
    setReportCommentId(commentId);
    setShowReportModal(true);
    setReportReason("");
  };

  const onCloseReportModal:DripPostCommentPresenterProps["onCloseReportModal"] = () => {
    setShowReportModal(false);
    setReportCommentId(null);
    setReportReason("");
  };

  const onReportSubmit:DripPostCommentPresenterProps["onReportSubmit"] = async () => {
    if (!reportCommentId || !reportReason) return;
    
    try {
      const data = await reportCommentQuery(reportCommentId, reportReason as ReportReasonType);
      
      if (data.success) {
        alert("신고가 접수되었습니다. 검토 후 처리됩니다.");
        onCloseReportModal();
      } else {
        alert(data.message || "신고 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("신고 처리 중 오류 발생:", error);
      if (error instanceof Error && error.message === '로그인이 필요합니다.') {
        alert('로그인이 필요합니다.');
      } else {
        alert("신고 처리 중 오류가 발생했습니다.");
      }
    }
  };

  const onChangeReportReason:DripPostCommentPresenterProps["onChangeReportReason"] = (value: string) => {
    setReportReason(value);
  };

  if (isLoading) {
    return <DripPostCommentSkeleton />;
  }

  return (
    <DripPostCommentPresenter
      commentList={comments || []}
      onLikeComment={onLikeComment}
      onReplyClick={onReplyClick}
      onCommentSubmit={handleCommentSubmit}
      newComment={commentContent}
      setNewComment={setCommentContent}
      expandedReplies={expandedReplies}
      toggleReplies={toggleReplies}
      isModalOpen={isModalOpen}
      onCloseModal={handleCloseModal}
      onOpenModal={handleOpenModal}
      activeMenuId={activeMenuId}
      handleMenuOpen={handleMenuOpen}
      onEditComment={onEditComment}
      onDeleteComment={onDeleteComment}
      editingCommentId={editingCommentId}
      editContent={editContent}
      setEditContent={setEditContent}
      onEditSubmit={onEditSubmit}
      onEditCancel={onEditCancel}
      myUserId={user_id}
      isAdmin={isAdmin}
      replyingToId={replyingToId}
      replyContent={replyContent}
      onChangeReply={onChangeReply}
      onSubmitReply={onSubmitReply}

      showReportModal={showReportModal}
      reportCommentId={reportCommentId}
      reportReason={reportReason}
      onOpenReportModal={onOpenReportModal}
      onCloseReportModal={onCloseReportModal}
      onReportSubmit={onReportSubmit}
      onChangeReportReason={onChangeReportReason}
    />
  );
};

export default DripPostCommentContainer;
