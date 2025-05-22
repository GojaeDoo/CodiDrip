"use client";

import React, { useState } from "react";
import DripPostDetailPresenter from "./DripPostDetail.presenter";
import { useQuery } from "@tanstack/react-query";
import { getDripPostDetail } from "./DripPostDetail.query";
import { Pin } from "./DripPostDetail.types";
import { DripPostDetailContainerProps } from "./DripPostDetail.types";

const DripPostDetailContainer = ({ postno }: DripPostDetailContainerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log("Container mounted with postNo:", postno);

  const {
    data: dripPost,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dripPost", postno],
    queryFn: () => getDripPostDetail(parseInt(postno, 10)),
  });

  console.log("Query result:", { dripPost, isLoading, error });

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("/")) {
      return `http://localhost:3005/uploads/drip${imagePath}`;
    }
    return `http://localhost:3005/uploads/drip/${imagePath}`;
  };

  let images: string[] = [];
  if (dripPost) {
    try {
      console.log("원본 게시글이미지:", dripPost.게시글이미지);
      if (typeof dripPost.게시글이미지 === "string") {
        images = JSON.parse(dripPost.게시글이미지);
      } else {
        images = [dripPost.게시글이미지];
      }
      console.log("파싱된 이미지 배열:", images);
    } catch (error) {
      console.error("이미지 파싱 에러:", error);
      images = [dripPost.게시글이미지];
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;
  if (!dripPost) return <div>No post found</div>;

  console.log("dripPost:", dripPost);
  console.log("핀 데이터:", dripPost.핀);

  const postTags = JSON.parse(dripPost.태그 || "[]");
  const pins: Pin[] = dripPost.핀 || [];

  console.log("파싱된 핀 데이터:", pins);

  return (
    <DripPostDetailPresenter
      dripPost={dripPost}
      images={images}
      currentImageIndex={currentImageIndex}
      onPrevImage={handlePrevImage}
      onNextImage={handleNextImage}
      getImageUrl={getImageUrl}
      postTags={postTags}
      pins={pins}
      postno={postno}
    />
  );
};

export default DripPostDetailContainer;
