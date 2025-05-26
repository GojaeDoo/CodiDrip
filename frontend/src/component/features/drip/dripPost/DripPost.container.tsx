"use client";

import { useEffect, useState } from "react";
import { DripPostPresenter } from "./DripPost.presenter";
import { DripPostContainerProps, DripPostType } from "./DripPost.types";
import { getUserDripPostQuery, deleteDripPostQuery } from "./DripPost.query";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const isDripUser = searchParams.get("dripUser") === "true";

  console.log("drip에서 온 성별 : " + gender);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setCurrentUserId(storedUserId);
  }, []);

  useEffect(() => {
    const fetchDripPosts = async () => {
      try {
        const response = await getUserDripPostQuery(
          userId,
          gender !== "all" ? gender : undefined
        );
        setDripPostData(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching drip posts:", error);
      }
    };

    fetchDripPosts();
  }, [userId, gender]);

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

  const onDeletePost = async (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number
  ) => {
    e.preventDefault();
    try {
      await deleteDripPostQuery(postNo);
      alert("게시글이 삭제되었습니다.");
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    }
  };

  const onLikeClick = (e: React.MouseEvent<SVGSVGElement>, postNo: number) => {
    e.preventDefault();
    alert(`게시글 ${postNo} 좋아요`);
  };

  const onCommentClick = (
    e: React.MouseEvent<SVGSVGElement>,
    postNo: number
  ) => {
    e.preventDefault();
    alert(`게시글 ${postNo} 댓글`);
  };

  const onMenuClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number
  ) => {
    e.preventDefault();
    setActiveMenu(activeMenu === postNo ? null : postNo);
  };

  const onClickMoveDetail = (postNo: number) => {
    router.push(`/dripPostDetail?postNo=${postNo}`);
  };

  const handleReportPost = async (e: React.MouseEvent, postNo: number) => {
    e.stopPropagation();
    // TODO: Implement report post functionality
    console.log("Report post:", postNo);
  };

  return isDripUser ? null : (
    <DripPostPresenter
      dripPostData={
        dripPostData
          ?.map((post) => {
            const images = post.post_image || [];
            const tags = post.post_tag || [];

            if (images.length === 0) {
              return null;
            }

            return {
              ...post,
              isOwner: post.user_id === currentUserId,
              currentImageIndex: currentImageIndexes[post.post_no] || 0,
              post_image: images,
              post_tag: tags,
            };
          })
          .filter((post): post is DripPostType => post !== null) ?? []
      }
      currentImageIndexes={currentImageIndexes}
      currentUserId={currentUserId}
      activeMenu={activeMenu}
      onPrevImage={onPrevImage}
      onNextImage={onNextImage}
      onHidePost={onHidePost}
      onEditPost={onEditPost}
      onDeletePost={onDeletePost}
      onLikeClick={onLikeClick}
      onCommentClick={onCommentClick}
      onMenuClick={onMenuClick}
      onClickMoveDetail={onClickMoveDetail}
      onReportPost={handleReportPost}
    />
  );
};

export default DripPostContainer;
