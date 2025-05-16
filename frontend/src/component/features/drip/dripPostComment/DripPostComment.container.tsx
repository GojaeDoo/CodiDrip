import React, { useEffect, useState, useRef } from "react";
import DripPostCommentPresenter from "./DripPostComment.presenter";
import {
  DripPostCommentPresenterProps,
  DripPostCommentProps,
  fetchDripComment,
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

export const DripPostCommentContainer = (props: DripPostCommentProps) => {
  const [fetchDripComment, setFetchDripComment] = useState<fetchDripComment[]>(
    []
  );
  const [postComment, setPostComment] = useState("");
  const [formattedComments, setFormattedComments] = useState<string[]>([]);
  const isSubmitting = useRef(false);

  useEffect(() => {
    const fetchDripPostComment = async () => {
      try {
        const response = await fetchDripPostCommentQuery(props.postno);
        setFetchDripComment(response);
        setFormattedComments(
          response.map((fetchDripComment: fetchDripComment) =>
            formatDate(fetchDripComment.작성시간)
          )
        );
      } catch (error) {
        console.error("댓글을 불러오는데 실패했습니다:", error);
      }
    };

    if (props.postno) {
      fetchDripPostComment();
    }
  }, [props.postno]);

  const onChangePostComment: DripPostCommentPresenterProps["onChangePostComment"] =
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPostComment(event.target.value);
      console.log(postComment);
    };

  const onKeyDownPostComment: DripPostCommentPresenterProps["onKeyDownPostComment"] =
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !event.repeat && !isSubmitting.current) {
        event.preventDefault();
        event.stopPropagation();

        if (isSubmitting.current) return;
        isSubmitting.current = true;

        try {
          console.log("Enter key pressed");
          const userId = localStorage.getItem("userId");
          if (!userId) {
            console.error("사용자 ID가 없습니다.");
            return;
          }
          console.log(userId);

          await postCommentQuery(userId, postComment, props.postno);
          // 댓글 작성 성공 후 댓글 목록 새로고침
          const response = await fetchDripPostCommentQuery(props.postno);
          setFetchDripComment(response);
          setFormattedComments(
            response.map((fetchDripComment: fetchDripComment) =>
              formatDate(fetchDripComment.작성시간)
            )
          );
          // 입력 필드 초기화
          setPostComment("");
        } catch (error) {
          console.error("댓글 작성 실패:", error);
        } finally {
          isSubmitting.current = false;
        }
      }
    };

  return (
    <DripPostCommentPresenter
      fetchDripComment={fetchDripComment}
      formattedComments={formattedComments}
      onChangePostComment={onChangePostComment}
      onKeyDownPostComment={onKeyDownPostComment}
    />
  );
};

export default DripPostCommentContainer;
