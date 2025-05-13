import React, { useEffect, useState } from "react";
import DripPostCommentPresenter from "./DripPostComment.presenter";
import { DripPostCommentProps, Comment } from "./DripPostComment.types";
import { fetchDripPostCommentQuery } from "./DripPostComment.query";

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [formattedComments, setFormattedComments] = useState<string[]>([]);

  useEffect(() => {
    const fetchDripPostComment = async () => {
      try {
        const response = await fetchDripPostCommentQuery(props.postno);
        setComments(response);
        setFormattedComments(
          response.map((comment) => formatDate(comment.작성시간))
        );
      } catch (error) {
        console.error("댓글을 불러오는데 실패했습니다:", error);
      }
    };

    if (props.postno) {
      fetchDripPostComment();
    }
  }, [props.postno]);

  return (
    <DripPostCommentPresenter
      comments={comments}
      formattedComments={formattedComments}
    />
  );
};

export default DripPostCommentContainer;
