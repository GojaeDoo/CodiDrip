import React, { useEffect, useState } from "react";
import DripPostComment from "./DripPostComment.presenter";
import { DripPostCommentContainerProps, Comment, DripPostCommentProps } from "./DripPostComment.types";
import { getCommentQuery, postCommentQuery, updateCommentQuery, deleteCommentQuery, likeCommentQuery, unlikeCommentQuery } from "./DripPostComment.query";
import { useRouter } from "next/navigation";

const formatDate = (dateString: string) => dateString.slice(0, 10);

// 댓글 데이터를 계층 구조로 변환하는 함수
const organizeComments = (comments: Comment[]) => {
  // 1. created_at 기준 정렬 (오래된 댓글이 먼저)
  const sorted = [...comments].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const commentMap = new Map<number, Comment & { replies: Comment[] }>();
  const rootComments: (Comment & { replies: Comment[] })[] = [];

  // 모든 댓글을 Map에 저장
  sorted.forEach(comment => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  // 댓글을 계층 구조로 정리
  sorted.forEach(comment => {
    if (comment.parent_id) {
      const parentKey = Number(comment.parent_id);
      console.log(
        'Trying to attach comment', comment.id,
        'to parent', parentKey,
        'map has:', commentMap.has(parentKey),
        'parent_id:', comment.parent_id,
        'parent_id type:', typeof comment.parent_id,
        'parentKey type:', typeof parentKey,
        'all map keys:', Array.from(commentMap.keys())
      );
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

  // 디버깅: 계층 구조가 잘 만들어졌는지 출력
  console.log('Organized comments:', JSON.stringify(rootComments, null, 2));

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

export const DripPostCommentContainer = (props: DripPostCommentProps) => {
  const [postno, setPostno] = useState<number>();
  const [commentContent, setCommentContent] = useState("");
  const [user_id, setUserId] = useState<string>("");
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  // 대댓글 관련 state
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [expandedReplies, setExpandedReplies] = useState<{ [key: number]: boolean }>({});

  const router = useRouter();

  useEffect(() => {
    setPostno(props.postno);
  }, [props.postno]);

  useEffect(() => {
    const user_id = localStorage.getItem("userId") ?? "";
    setUserId(user_id);
  }, []);

  useEffect(() => {
    if (typeof postno === 'number' && user_id) {
      const postCommentFetch = async () => {
        const response = await getCommentQuery(postno, user_id);
        const organizedComments = organizeComments(response);
        setCommentList(organizedComments);
      };
      postCommentFetch();
    }
  }, [postno, user_id]);

  const onChangeComment: DripPostCommentContainerProps["onChangeComment"] = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  const onSubmitComment: DripPostCommentContainerProps["onSubmitComment"] = async () => {
    if (user_id === "") {
      alert("로그인 후 댓글을 작성해주세요.");
      router.push("/login");
      return;
    }

    if (commentContent === "") {
      alert("댓글을 입력해주세요.");
      return;
    }
    if (typeof postno === 'number' && typeof user_id === 'string') {
      await postCommentQuery(postno, user_id, commentContent);
      const response = await getCommentQuery(postno, user_id);
      const organizedComments = organizeComments(response);
      setCommentList(organizedComments);
      setCommentContent("");
    } else {
      console.error("postno나 user_id가 올바르지 않습니다.");
    }
  }

  // 메뉴 관련 핸들러
  const handleMenuOpen = (commentId: number) => {
    setActiveMenuId(prev => (prev === commentId ? null : commentId));
  };
  // 수정 모드 진입
  const onEditComment = (commentId: number) => {
    const comment = findCommentById(commentList, commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditContent(comment.content);
    }
    setActiveMenuId(null);
  };
  // 수정 취소
  const onEditCancel = () => {
    setEditingCommentId(null);
    setEditContent("");
  };
  
  // 수정 완료
  const onEditSubmit = async () => {
    if (editingCommentId !== null) {
      await updateCommentQuery(editingCommentId, editContent);
      setEditingCommentId(null);
      setEditContent("");
      // 댓글 목록 새로고침
      if (typeof postno === 'number' && user_id) {
        const response = await getCommentQuery(postno, user_id);
        const organizedComments = organizeComments(response);
        setCommentList(organizedComments);
      }
    }
  };
  
  const onDeleteComment = async (commentId: number) => {
    setActiveMenuId(null);
    await deleteCommentQuery(commentId);
    // 삭제 후 전체 목록 새로고침
    if (typeof postno === 'number' && user_id) {
      const response = await getCommentQuery(postno, user_id);
      const organizedComments = organizeComments(response);
      setCommentList(organizedComments);
    }
  };

  const onLikeComment = async (commentId: number) => {
    const comment = findCommentById(commentList, commentId);
    if (!comment) return;
    const myUserId = user_id;
    if (!myUserId) return;
    if (comment.liked) {
      await unlikeCommentQuery(commentId, myUserId);
    } else {
      await likeCommentQuery(commentId, myUserId);
    }
    // 좋아요/취소 후 전체 목록 새로고침
    if (typeof postno === 'number') {
      const response = await getCommentQuery(postno, myUserId);
      const organizedComments = organizeComments(response);
      setCommentList(organizedComments);
    }
  };

  // 대댓글 관련 함수들
  const onReplyClick = (commentId: number) => {
    setReplyingToId(replyingToId === commentId ? null : commentId);
    setReplyContent("");
  };

  const onChangeReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyContent(e.target.value);
  };

  const onSubmitReply = async () => {
    if (!replyContent.trim() || !user_id || !replyingToId || !postno) return;

    try {
      await postCommentQuery(postno, user_id, replyContent, replyingToId.toString());
      setReplyContent("");
      setReplyingToId(null);
      // 댓글 목록 새로고침
      const response = await getCommentQuery(postno, user_id);
      const organizedComments = organizeComments(response);
      setCommentList(organizedComments);
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

  const containerProps: DripPostCommentContainerProps = {
    commentList,
    onChangeComment,
    onSubmitComment,
    onLikeComment,
    handleMenuOpen,
    activeMenuId,
    onEditComment,
    onDeleteComment,
    editingCommentId,
    editContent,
    setEditContent,
    onEditSubmit,
    onEditCancel,
    replyingToId,
    onReplyClick,
    onChangeReply,
    onSubmitReply,
    myUserId: user_id,
    expandedReplies,
    toggleReplies
  };

  return (
    <DripPostComment
      {...containerProps}
      commentContent={commentContent}
      setCommentContent={setCommentContent}
      replyContent={replyContent}
    />
  );
};

export default DripPostCommentContainer;
