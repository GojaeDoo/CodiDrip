"use client";

import { useEffect, useState } from "react";
import { DripPostPresenter } from "./DripPost.presenter";
import { DripPostContainerProps, DripPostType } from "./DripPost.types";
import { getUserDripPostQuery } from "./DripPost.query";
import { useRouter } from "next/navigation";

export const DripPostContainer = ({
  gender,
  userId,
}: DripPostContainerProps) => {
  const [dripPostData, setDripPostData] = useState<DripPostType[] | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>({});
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const router = useRouter();

  console.log("drip에서 온 성별 : " + gender);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setCurrentUserId(storedUserId);
  }, []);

  useEffect(() => {
    const fetchDripPosts = async () => {
      try {
        const response = await getUserDripPostQuery(userId);
        setDripPostData(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching drip posts:", error);
      }
    };

    fetchDripPosts();
  }, [userId]);

  const onPrevImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number,
    totalImages: number
  ) => {
    e.preventDefault();
    setCurrentImageIndexes((prev) => {
      const currentIndex = prev[postNo] || 0;
      const newIndex = (currentIndex - 1 + totalImages) % totalImages;
      return { ...prev, [postNo]: newIndex };
    });
  };

  const onNextImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number,
    totalImages: number
  ) => {
    e.preventDefault();
    setCurrentImageIndexes((prev) => {
      const currentIndex = prev[postNo] || 0;
      const newIndex = (currentIndex + 1) % totalImages;
      return { ...prev, [postNo]: newIndex };
    });
  };

  const onHidePost = (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number
  ) => {
    e.preventDefault();
    alert(`게시글 ${postNo} 숨김`);
  };

  const onEditPost = (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number
  ) => {
    e.preventDefault();
    const status = true;
    router.push(`/dripPostEdit?postNo=${postNo}&status=${status}`);
  };

  const onDeletePost = (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number
  ) => {
    e.preventDefault();
    alert(`게시글 ${postNo} 삭제`);
  };

  const onMenuClick = (postNo: number) => {
    setActiveMenu(activeMenu === postNo ? null : postNo);
  };

  const onClickMoveDetail = (postNo: number) => {
    router.push(`/dripPostDetail?postNo=${postNo}`);
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
      onClickMoveDetail={onClickMoveDetail}
    />
  );
};

export default DripPostContainer;
