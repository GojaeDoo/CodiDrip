"use client";

import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DripPostComment from "./DripPostComment.presenter";
import { DripPostCommentContainerProps, Comment, DripPostCommentProps } from "./DripPostComment.types";
import { getCommentQuery, postCommentQuery, updateCommentQuery, deleteCommentQuery, likeCommentQuery, unlikeCommentQuery } from "./DripPostComment.query";
import { useRouter } from "next/navigation";
import axios from "axios";

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

  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
  } = useQuery({
    queryKey: ["comments", props.postno],
    queryFn: async () => {
      const userId = localStorage.getItem("userId") ?? "";
      console.log("userId", userId);
      setUserId(userId);
      const response = await getCommentQuery(props.postno, userId);
      return organizeComments(response);
    },
  });

  useEffect(() => {
    const handleOpenCommentModal = () => {
      handleOpenModal();
    };

    window.addEventListener('openCommentModal', handleOpenCommentModal);

    return () => {
      window.removeEventListener('openCommentModal', handleOpenCommentModal);
    };
  }, []);

  const handleCommentSubmit = async () => {
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

  const handleMenuOpen = (commentId: number) => {
    setActiveMenuId(prev => (prev === commentId ? null : commentId));
  };
  
  const onEditComment = (commentId: number) => {
    const comment = findCommentById(comments || [], commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditContent(comment.content);
    }
    setActiveMenuId(null);
  };

  const onEditCancel = () => {
    setEditingCommentId(null);
    setEditContent("");
  };
  
  const onEditSubmit = async () => {
    if (editingCommentId !== null) {
      await updateCommentQuery(editingCommentId, editContent);
      setEditingCommentId(null);
      setEditContent("");
      queryClient.invalidateQueries({ queryKey: ["comments", props.postno] });
    }
  };
  
  const onDeleteComment = async (commentId: number) => {
    setActiveMenuId(null);
    await deleteCommentQuery(commentId);
    queryClient.invalidateQueries({ queryKey: ["comments", props.postno] });
  };

  const onLikeComment = async (commentId: number) => {
    if (!user_id) return;
    const comment = findCommentById(comments || [], commentId);
    if (!comment) return;

    if (comment.liked) {
      await unlikeCommentQuery(commentId, user_id);
    } else {
      await likeCommentQuery(commentId, user_id);
    }
    queryClient.invalidateQueries({ queryKey: ["comments", props.postno] });
  };

  const onReplyClick = (commentId: number) => {
    if (!user_id) {
      alert("로그인 후 답글을 작성해주세요.");
      router.push("/login");
      return;
    }
    setReplyingToId(replyingToId === commentId ? null : commentId);
    setReplyContent("");
  };

  const onChangeReply = (value: string) => {
    setReplyContent(value);
  };

  const onSubmitReply = async () => {
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

  const toggleReplies = (commentId: number) => {
    setExpandedReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("로그인 후 댓글을 작성해주세요.");
      router.push("/login");
      return;
    }
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <DripPostComment
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
      replyingToId={replyingToId}
      replyContent={replyContent}
      onChangeReply={onChangeReply}
      onSubmitReply={onSubmitReply}
    />
  );
};

export default DripPostCommentContainer;
