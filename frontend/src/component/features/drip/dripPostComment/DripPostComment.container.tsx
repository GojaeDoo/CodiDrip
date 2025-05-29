import { useEffect, useState } from "react";
import DripPostComment from "./DripPostComment.presenter";
import { DripPostCommentContainerProps, DripPostCommentFetchState, DripPostCommentProps } from "./DripPostComment.types";
import { getCommentQuery, postCommentQuery, updateCommentQuery, deleteCommentQuery, likeCommentQuery, unlikeCommentQuery } from "./DripPostComment.query";

const formatDate = (dateString: string) => dateString.slice(0, 10);

export const DripPostCommentContainer = (props:DripPostCommentProps) => {
  const [postno , setPostno] = useState<number>();
  const [commentContent, setCommentContent] = useState("");
  const [user_id, setUserId] = useState<string>("");
  const [commentList, setCommentList] = useState<DripPostCommentFetchState[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");

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
        const formatted = response.map((item: DripPostCommentFetchState) => ({
          ...item,
          created_at: formatDate(item.created_at),
        }));
        setCommentList(formatted);
        console.log("오긴하니?", formatted);
      };
      postCommentFetch();
    }
  }, [postno, user_id]);

  const onChangeComment: DripPostCommentContainerProps["onChangeComment"] = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
    console.log("입력값:", e.target.value);
  };

  const onSubmitComment: DripPostCommentContainerProps["onSubmitComment"] = async () => {
    if (typeof postno === 'number' && typeof user_id === 'string') {
      await postCommentQuery(postno, user_id, commentContent);
      // 댓글 작성 후 전체 목록을 다시 fetch
      const response = await getCommentQuery(postno, user_id);
      const formatted = response.map((item: DripPostCommentFetchState) => ({
        ...item,
        created_at: formatDate(item.created_at),
      }));
      setCommentList(formatted);
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
    const comment = commentList.find(c => c.id === commentId);
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
        const formatted = response.map((item: DripPostCommentFetchState) => ({
          ...item,
          created_at: formatDate(item.created_at),
        }));
        setCommentList(formatted);
      }
    }
  };
  
  const onDeleteComment = async (commentId: number) => {
    setActiveMenuId(null);
    await deleteCommentQuery(commentId);
    // 삭제 후 전체 목록 새로고침
    if (typeof postno === 'number' && user_id) {
      const response = await getCommentQuery(postno, user_id);
      const formatted = response.map((item: DripPostCommentFetchState) => ({
        ...item,
        created_at: formatDate(item.created_at),
      }));
      setCommentList(formatted);
    }
  };

  const onLikeComment = async (commentId: number) => {
    const comment = commentList.find(c => c.id === commentId);
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
      console.log('getCommentQuery response after like:', response);
      const formatted = response.map((item: DripPostCommentFetchState) => ({
        ...item,
        created_at: formatDate(item.created_at),
      }));
      setCommentList(formatted);
    }
  };

  return (
    <DripPostComment
      onChangeComment={onChangeComment}
      onSubmitComment={onSubmitComment}
      commentList={commentList}
      myUserId={user_id}
      activeMenuId={activeMenuId}
      handleMenuOpen={handleMenuOpen}
      onEditComment={onEditComment}
      onEditCancel={onEditCancel}
      onEditSubmit={onEditSubmit}
      onDeleteComment={onDeleteComment}
      editingCommentId={editingCommentId}
      editContent={editContent}
      setEditContent={setEditContent}
      onLikeComment={onLikeComment}
    />
  );
};

export default DripPostCommentContainer;
