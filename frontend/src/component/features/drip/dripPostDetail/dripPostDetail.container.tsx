"use client";

import React, { useRef, useState, useCallback, useLayoutEffect } from "react";
import DripPostDetailPresenter from "./DripPostDetail.presenter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDripPostDetail, likeDripPostQuery, unlikeDripPostQuery, getDripPostLikeStatus } from "./DripPostDetail.query";
import { DripPostDetailProps } from "./DripPostDetail.types";

const DripPostDetailContainer = ({ postno }: DripPostDetailProps) => {
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imgInfo, setImgInfo] = useState({ width: 1, height: 1, left: 0, top: 0 });
  const [aspectRatio, setAspectRatio] = useState("3 / 4");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  console.log("Container mounted with postNo:", postno);

  const {
    data: dripPost,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dripPost", parseInt(postno)],
    queryFn: () => getDripPostDetail(parseInt(postno)),
  });

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("[like-status] 요청 파라미터:", { postNo: postno, userId });
    if (!userId || !postno) return;
    getDripPostLikeStatus(parseInt(postno), userId)
      .then((liked) => setIsLiked(liked))
      .catch(() => setIsLiked(false));
  }, [postno]);

  const updateRect = useCallback(() => {
    if (containerRef.current && imageRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const img = imageRef.current;
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const containerWidth = container.width;
      const containerHeight = container.height;
      const imgAspect = naturalWidth / naturalHeight;
      const containerAspect = containerWidth / containerHeight;

      let displayWidth = containerWidth;
      let displayHeight = containerHeight;
      let offsetLeft = 0;
      let offsetTop = 0;

      if (imgAspect > containerAspect) {
        displayWidth = containerWidth;
        displayHeight = containerWidth / imgAspect;
        offsetTop = (containerHeight - displayHeight) / 2;
      } else {
        displayHeight = containerHeight;
        displayWidth = containerHeight * imgAspect;
        offsetLeft = (containerWidth - displayWidth) / 2;
      }

      setImgInfo({
        width: displayWidth,
        height: displayHeight,
        left: offsetLeft,
        top: offsetTop,
      });
    }
  }, []);

  useLayoutEffect(() => {
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [updateRect, currentImageIndex]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
    updateRect();
  };

  const handleLikeClick = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      if (isLiked) {
        await unlikeDripPostQuery(parseInt(postno), userId);
      } else {
        await likeDripPostQuery(parseInt(postno), userId);
      }
      // 좋아요 상태를 다시 동기화
      console.log("[like-status] 요청 파라미터 (after click):", { postNo: postno, userId });
      if (!userId || !postno) return;
      const liked = await getDripPostLikeStatus(parseInt(postno), userId);
      setIsLiked(liked);
    } catch (error) {
      console.error("좋아요 처리 중 에러:", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

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
      // 파일명만 있으면 URL 붙이기
      images = images.map(img =>
        img.startsWith("http")
          ? img
          : `http://localhost:3005/uploads/drip/${img.replace(/^[\\\/]+/, "")}`
      );
      console.log("파싱된 이미지 배열:", images);
    } catch (error) {
      console.error("이미지 파싱 에러:", error);
      images = [dripPost.게시글이미지];
      images = images.map(img =>
        img.startsWith("http")
          ? img
          : `http://localhost:3005/uploads/drip/${img.replace(/^[\\\/]+/, "")}`
      );
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;
  if (!dripPost) return <div>No post found</div>;

  console.log("dripPost:", dripPost);

  const postTags = JSON.parse(dripPost.태그 || "[]");

  return (
    <DripPostDetailPresenter
      containerRef={containerRef}
      imageRef={imageRef}
      aspectRatio={aspectRatio}
      onImageLoad={handleImageLoad}
      dripPost={dripPost}
      images={images}
      currentImageIndex={currentImageIndex}
      onPrevImage={handlePrevImage}
      onNextImage={handleNextImage}
      getImageUrl={getImageUrl}
      postTags={postTags}
      postno={postno}
      isLiked={isLiked}
      onLikeClick={handleLikeClick}
    />
  );
};

export default DripPostDetailContainer;
