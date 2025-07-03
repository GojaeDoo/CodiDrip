"use client";

import React, { useRef, useState, useCallback, useLayoutEffect, useEffect } from "react";
import DripPostDetailPresenter from "./DripPostDetail.presenter";
import { useQuery } from "@tanstack/react-query";
import { getDripPostDetail, postLikeDripPostQuery, deleteUnlikeDripPostQuery, getDripPostLikeStatus, postSaveDripPostQuery, getDripPostSaveStatus } from "./DripPostDetail.query";
import { DripPostDetailPresenterProps, DripPostDetailProps } from "./DripPostDetail.types";
import { useRouter } from "next/navigation";

const DripPostDetailContainer = ({ postno }: DripPostDetailProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [aspectRatio, setAspectRatio] = useState("3 / 4");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [userId, setUserId] = useState<string>("");
  const [isSaved, setIsSaved] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const {
    data: dripPost,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dripPost", parseInt(postno)],
    queryFn: () => getDripPostDetail(parseInt(postno)),
  });

  const { data: likeStatus, isLoading: isLikeStatusLoading } = useQuery({
    queryKey: ["dripPostLikeStatus", postno],
    queryFn: () => getDripPostLikeStatus(parseInt(postno), userId),
    enabled: !!userId,
    staleTime: 0,
    retry: 1
  });

  const { data: saveStatus } = useQuery({
    queryKey: ["dripPostSaveStatus", postno, userId],
    queryFn: () => getDripPostSaveStatus(parseInt(postno), userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (!isLikeStatusLoading && likeStatus !== undefined) {
      setIsLiked(Boolean(likeStatus));
    }
  }, [likeStatus, isLikeStatusLoading]);

  useEffect(() => {
    if (dripPost) {
      setLikeCount(Number(dripPost["좋아요 개수"]) || 0);
      setCommentCount(Number(dripPost["댓글 개수"]) || 0);
    }
  }, [dripPost]);

  useEffect(() => {
    if (saveStatus !== undefined) {
      setIsSaved(saveStatus);
    }
  }, [saveStatus]);

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

      // let displayWidth: number;
      // let displayHeight: number;

      if (imgAspect > containerAspect) {
        // displayWidth = containerWidth;
        // displayHeight = containerWidth / imgAspect;
        // offsetTop = (containerHeight - displayHeight) / 2;
      } else {
        // displayHeight = containerHeight;
        // displayWidth = containerHeight * imgAspect;
        // offsetLeft = (containerWidth - displayWidth) / 2;
      }
    }
  }, []);

  useLayoutEffect(() => {
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [updateRect, currentImageIndex]);

  const handleImageLoad:DripPostDetailPresenterProps["onImageLoad"] = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
    updateRect();
  };

  const handleLikeClick:DripPostDetailPresenterProps["onLikeClick"] = async () => {
    if (!userId) {
      alert("로그인 후 좋아요를 누를 수 있습니다.");
      router.push("/login");
      return;
    }

    try {
      if (isLiked) {
        await deleteUnlikeDripPostQuery(parseInt(postno), userId);
        setLikeCount(prev => prev - 1);
      } else {
        await postLikeDripPostQuery(parseInt(postno), userId);
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handlePrevImage:DripPostDetailPresenterProps["onPrevImage"] = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNextImage:DripPostDetailPresenterProps["onNextImage"] = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  let images: string[] = [];
  if (dripPost) {
    try {
      if (typeof dripPost.게시글이미지 === "string") {
        images = JSON.parse(dripPost.게시글이미지);
      } else {
        images = [dripPost.게시글이미지];
      }
      images = images.map(img =>
        img.startsWith("http")
          ? img
          : `http://localhost:3005/uploads/drip/${img.replace(/^[\\\/]+/, "")}`
      );
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

  const postTags = JSON.parse(dripPost.태그 || "[]");

  const onCommentClick:DripPostDetailPresenterProps["onCommentClick"] = () => {
    if (!userId) {
      alert("로그인 후 댓글을 작성할 수 있습니다.");
      router.push("/login");
      return;
    }
    window.dispatchEvent(new Event('openCommentModal'));
  };

  const handleClickSave:DripPostDetailPresenterProps["handleClickSave"] = async () => {
    if (!userId) {
      alert("로그인 후 이용해주세요.");
      router.push("/login");
      return;
    }
    try {
      const response = await postSaveDripPostQuery(parseInt(postno), userId);
      setIsSaved(response.saved);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

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
      postTags={postTags}
      postno={postno}
      isLiked={isLiked}
      onLikeClick={handleLikeClick}
      onCommentClick={onCommentClick}
      likeCount={likeCount}
      commentCount={commentCount}
      handleClickSave={handleClickSave}
      isSaved={isSaved}
    />
  );
};

export default DripPostDetailContainer;
