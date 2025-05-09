"use client";

import { useEffect, useState } from "react";
import { DripPostPresenter } from "./DripPost.presenter";
import { DripPostContainerProps, DripPostType } from "./DripPost.types";
import { getUserDripPostQuery } from "./DripPost.query";
import { useRouter } from "next/navigation";

export const DripPostContainer = ({ userId }: DripPostContainerProps) => {
  const [dripPostData, setDripPostData] = useState<DripPostType[] | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>({});
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setCurrentUserId(storedUserId);
  }, []);

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

  const onHidePost = (postNo: number) => {
    alert(`게시글 ${postNo} 숨김`);
  };
  const onEditPost = (postNo: number) => {
    const status = true;
    router.push(`/dripPostEdit?postNo=${postNo}&status=${status}`);
  };
  const onDeletePost = (postNo: number) => {
    alert(`게시글 ${postNo} 삭제`);
  };

  const onMenuClick = (postNo: number) => {
    setActiveMenu(activeMenu === postNo ? null : postNo);
  };

  return (
    <DripPostPresenter
      dripPostData={dripPostData ?? []}
      currentImageIndexes={currentImageIndexes}
      currentUserId={currentUserId}
      onPrevImage={onPrevImage}
      onNextImage={onNextImage}
      onHidePost={onHidePost}
      onEditPost={onEditPost}
      onDeletePost={onDeletePost}
      onMenuClick={onMenuClick}
      activeMenu={activeMenu}
    />
  );
};

export default DripPostContainer;
