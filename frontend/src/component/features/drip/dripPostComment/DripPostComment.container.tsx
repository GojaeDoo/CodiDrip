import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import DripPostComment from "./DripPostComment.presenter";
import {
  DripPostCommentPresenterProps,
  DripPostCommentProps,
  fetchDripComment,
  Comment,
} from "./DripPostComment.types";
import {
  fetchDripPostCommentQuery,
  postCommentQuery,
} from "./DripPostComment.query";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "오후" : "오전";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${month}월${day}일 ${ampm} ${formattedHours}:${formattedMinutes}`;
};

export const DripPostCommentContainer = ({ postno }: { postno: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");
  const [replyContents, setReplyContents] = useState<{ [key: number]: string }>({});
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>({});
  const [replies, setReplies] = useState<{ [key: number]: Comment[] }>({});
  const { data: session } = useSession();
  const isSubmitting = useRef(false);

  const fetchComments = async () => {
    try {
      const response = await fetchDripPostCommentQuery(postno);
      const formattedComments = Array.isArray(response) ? response : [];
      setComments(formattedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim() || !session?.user?.email || isSubmitting.current) return;

    isSubmitting.current = true;
    try {
      await postCommentQuery(session.user.email, commentContent, postno);
      setCommentContent("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      isSubmitting.current = false;
    }
  };

  const handleReplySubmit = async (e: React.FormEvent, commentId: number) => {
    e.preventDefault();
    const replyContent = replyContents[commentId];
    if (!replyContent?.trim() || !session?.user?.email || isSubmitting.current) return;

    isSubmitting.current = true;
    try {
      await postCommentQuery(session.user.email, replyContent, postno, commentId);
      setReplyContents(prev => ({ ...prev, [commentId]: "" }));
      fetchComments();
    } catch (error) {
      console.error("Error posting reply:", error);
    } finally {
      isSubmitting.current = false;
    }
  };

  const fetchReplies = async (commentId: number) => {
    try {
      const response = await fetchDripPostCommentQuery(postno, commentId);
      const fetchedReplies = Array.isArray(response) ? response : [];
      setReplies(prev => ({ ...prev, [commentId]: fetchedReplies }));
      return fetchedReplies;
    } catch (error) {
      console.error("Error fetching replies:", error);
      return [];
    }
  };

  const handleShowReplies = async (commentId: number) => {
    if (!showReplies[commentId]) {
      await fetchReplies(commentId);
    }
    setShowReplies(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleReplyContentChange = (commentId: number, content: string) => {
    setReplyContents(prev => ({ ...prev, [commentId]: content }));
  };

  const handleCommentContentChange = (content: string) => {
    setCommentContent(content);
  };

  useEffect(() => {
    fetchComments();
  }, [postno]);

  return (
    <DripPostComment
      postno={postno}
      comments={comments}
      isLoading={isLoading}
      commentContent={commentContent}
      onCommentContentChange={handleCommentContentChange}
      onCommentSubmit={handleCommentSubmit}
      replyContents={replyContents}
      onReplyContentChange={handleReplyContentChange}
      onReplySubmit={handleReplySubmit}
      showReplies={showReplies}
      onShowReplies={handleShowReplies}
      replies={replies}
    />
  );
};

export default DripPostCommentContainer;
