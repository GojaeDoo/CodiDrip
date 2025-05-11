"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DripPostDetailPresenter } from "./dripPostDetail.presenter";
import { DripPostDetailResponse } from "./dripPostDetail.types";
import { fetchDripPostQuery } from "./dripPostDetail.query";

export const DripPostDetailContainer = () => {
  const [dripPost, setDripPost] = useState<DripPostDetailResponse>();
  const params = useSearchParams();

  useEffect(() => {
    const fetchDripPostDetail = async () => {
      try {
        const postNo = params.get("postNo");
        if (postNo) {
          const response = await fetchDripPostQuery(postNo);
          setDripPost(response);
        }
      } catch (error) {
        console.error("게시글 상세 조회 실패:", error);
      }
    };

    fetchDripPostDetail();
  }, []);

  const postImages = dripPost?.게시글이미지
    ? JSON.parse(dripPost.게시글이미지)
    : [];
  const postTags = dripPost?.태그 ? JSON.parse(dripPost.태그) : [];

  return (
    <DripPostDetailPresenter
      dripPost={dripPost}
      postImages={postImages}
      postTags={postTags}
    />
  );
};

export default DripPostDetailContainer;
