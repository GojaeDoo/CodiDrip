"use client";

import React, { useEffect, useState } from "react";
import FreeBoardEditPresenter from "./FreeBoardEdit.presenter";
import {FreeBoardEditPresenterProps } from "./FreeBoardEdit.types";
import { useRouter, useSearchParams } from "next/navigation";
import { postFreeBoardWriteQuery, updateFreeBoardWriteQuery } from "./FreeBoardEdit.query";
import { getFreeBoardDetailQuery } from "../freeBoardDetail/FreeBoardDetail.query";

export const FreeBoardEditContainer = () => {
  const [title , setTitle] = useState<string>("");
  const [content , setContent] = useState<string>("");
  const router = useRouter();

  const userId = localStorage.getItem("userId");
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const postId = searchParams.get("id");
  const isEditMode = status === "true";

  useEffect(() => {
    const fetchPost = async () => {
      if (isEditMode && postId) {
        try {
          const response = await getFreeBoardDetailQuery(parseInt(postId));
          setTitle(response.title);
          setContent(response.content);
        } catch (error) {
          console.error("게시글 조회 오류:", error);
          alert("게시글을 불러오는데 실패했습니다.");
        }
      }
    };

    fetchPost();
  }, [isEditMode, postId]);

  const onChangeTitle:FreeBoardEditPresenterProps["onChangeTitle"] = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const onChangeContent:FreeBoardEditPresenterProps["onChangeContent"] = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }

  const onClickSend:FreeBoardEditPresenterProps["onClickSend"] = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (!userId) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    try {
      if (isEditMode && postId) {
        // 수정 모드
        const parsedPostId = parseInt(postId);
        await updateFreeBoardWriteQuery(parsedPostId, title, content, userId);
        alert("게시글이 성공적으로 수정되었습니다!");
      } else {
        // 새 글 작성 모드
        await postFreeBoardWriteQuery(title, content, userId);
        alert("게시글이 성공적으로 등록되었습니다!");
      }
      router.push("/freeBoardList");
    } catch {
      alert("작업에 실패했습니다. 다시 시도해주세요.");
    }
  }

  const onClickCancel:FreeBoardEditPresenterProps["onClickCancel"] = () => {
    router.push("/freeBoardList");
  }

  return (
    <FreeBoardEditPresenter
    onChangeTitle={onChangeTitle}
    onChangeContent={onChangeContent}
    onClickSend={onClickSend}
    onClickCancel={onClickCancel}
    titleLength={title.length}
    contentLength={content.length}
    status={isEditMode}
    title={title}
    content={content}
    />
  );
};

export default FreeBoardEditContainer;