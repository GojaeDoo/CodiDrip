"use client";

import { useEffect, useState } from "react";
import { DripPostPresenter } from "./DripPost.presenter";
import { DripPostContainerProps, DripPostType } from "./DripPost.types";
import { getUserDripPostQuery } from "./DripPost.query";

export const DripPostContainer = ({
  isMyPage = false,
  userId,
}: DripPostContainerProps) => {
  const [dripPostData, setDripPostData] = useState<DripPostType[] | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const fetchDripPosts = async () => {
      try {
        const response = await getUserDripPostQuery(userId);
        setDripPostData(response);
      } catch (error) {
        console.error("Error fetching drip posts:", error);
      }
    };

    fetchDripPosts();
  }, [userId]);

  const onPrevImage = (postNo: number, imageCount: number) => {
    setCurrentImageIndexes((prev) => {
      const currentIndex = prev[postNo] || 0;
      const newIndex = (currentIndex - 1 + imageCount) % imageCount;
      return { ...prev, [postNo]: newIndex };
    });
  };

  const onNextImage = (postNo: number, imageCount: number) => {
    setCurrentImageIndexes((prev) => {
      const currentIndex = prev[postNo] || 0;
      const newIndex = (currentIndex + 1) % imageCount;
      return { ...prev, [postNo]: newIndex };
    });
  };

  return (
    <DripPostPresenter
      dripPostData={dripPostData}
      currentImageIndexes={currentImageIndexes}
      onPrevImage={onPrevImage}
      onNextImage={onNextImage}
    />
  );
};

export default DripPostContainer;
