"use client"

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FreeBoardDetailPresenter from "./FreeBoardDetail.presenter";
import { FreeBoardDetailPost } from "./FreeBoardDetail.types";
import { deleteFreeBoardWriteQuery, getFreeBoardDetailQuery } from "./FreeBoardDetail.query";

export const FreeBoardDetailContainer = () => {
  const [post, setPost] = useState<FreeBoardDetailPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        
        const response = await getFreeBoardDetailQuery(parseInt(postId));
        console.log("자유게시판 상세 조회 성공:", response);
        setPost(response);
        
        if (userId === response.user_id) {
          setIsLogin(true);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBackToList = () => {
    router.push("/freeBoardList");
  };

  const handleEdit = () => {
    if (post) {
      router.push(`/freeBoardEdit?status=true&id=${post.id}`);
    }
  };

  const onDelete = async () => {
    if (post && window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      console.log("게시글 삭제:", post.id);
      const response = await deleteFreeBoardWriteQuery(post.id);
      console.log("response : " + response);
      alert("게시글이 삭제되었습니다.");
      router.push("/freeBoardList");
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
    />
  );
};

export default FreeBoardDetailContainer;
