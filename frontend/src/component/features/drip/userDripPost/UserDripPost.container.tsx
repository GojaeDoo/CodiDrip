"use client";

import { useEffect, useState } from "react";
import { UserDripPostPresenter } from "./UserDripPost.presenter";
import { DripPostType } from "./UserDripPost.types";
import { getUserDripPostFetch } from "./UserDripPost.query";

export const UserDripPostContainer = () => {
  const [dripPostData, setDripPostData] = useState<DripPostType[] | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const storageId = localStorage.getItem("userId");
    if (storageId) {
      const getUserDripPost = async () => {
        try {
          const response = await getUserDripPostFetch(storageId);
          console.log("API Response:", response);
          setDripPostData(response);
        } catch (error) {
          console.error("Error fetching drip post:", error);
        }
      };
      getUserDripPost();
    }
  }, []);

  const handlePrevImage = (postId: number, imageCount: number) => {
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0 - 1 + imageCount) % imageCount,
    }));
  };

  const handleNextImage = (postId: number, imageCount: number) => {
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0 + 1) % imageCount,
    }));
  };

  return (
    <>
      <UserDripPostPresenter
        dripPostData={dripPostData}
        currentImageIndexes={currentImageIndexes}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
      />
    </>
  );
};

export default UserDripPostContainer;
