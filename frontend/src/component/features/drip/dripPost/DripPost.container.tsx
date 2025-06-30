"use client";

import { useEffect, useState } from "react";
import { DripPostPresenter } from "./DripPost.presenter";
import { DripPostContainerProps, DripPostType, ReportReasonType } from "./DripPost.types";
import { getUserDripPostQuery, deleteDripPostQuery, likeDripPostQuery, createReport } from "./DripPost.query";
import { useRouter, useSearchParams } from "next/navigation";
import { encodeUserId } from "@/utils/urlEncoder";
import { useAuth } from "@/context/AuthContext";

export const DripPostContainer = ({
  gender,
  userId,
  isMyPage,
  isLike,
  isSaved,
  selectedStyles
}: DripPostContainerProps) => {
  const [dripPostData, setDripPostData] = useState<DripPostType[] | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>({});
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  // 신고 모달 관련 상태
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportPostNo, setReportPostNo] = useState<number | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDripUser = searchParams.get("dripUser") === "true";
  const { isAdmin } = useAuth();

  console.log("=== DripPost Container ===");
  console.log("isAdmin:", isAdmin);
  console.log("isAdmin 타입:", typeof isAdmin);
  console.log("=== DripPost Container 끝 ===");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setCurrentUserId(storedUserId);
    }
  }, []);
  
  // 두 번째 useEffect - 게시물 가져오기
  useEffect(() => {
    const fetchDripPosts = async () => {
      if (!currentUserId && isMyPage) return; // 마이페이지인데 currentUserId가 없으면 리턴
      
      setIsLoading(true);
      try {
        const targetUserId = isMyPage ? currentUserId : undefined;
        console.log("Fetching posts with params:", {
          targetUserId,
          gender,
          isMyPage,
          isLike,
          isSaved
        });
        const response = await getUserDripPostQuery(
          targetUserId,
          gender !== "all" ? gender : undefined,
          isMyPage,
          isLike,
          isSaved,
          selectedStyles
        );
        setDripPostData(response);
      } catch (error) {
        console.error("Error fetching drip posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDripPosts();
  }, [userId, gender, isMyPage, currentUserId, isLike, isSaved, selectedStyles]);

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
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    }
  };

  const onClickMoveUserProfile = (e: React.MouseEvent<HTMLDivElement>, postNo: number, userId: string) => {
    e.stopPropagation();
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId === userId) {
      router.push(`/myPage`);
    } else {
      const encodedUserId = encodeUserId(userId);
      router.push(`/myPage?status=true&uid=${encodedUserId}`);
    }
  }

  const onLikeClick = (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => {
    e.preventDefault();
    handleLike(postNo);
  };

  const onCommentClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number
  ) => {
    e.preventDefault();
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
  };

  // 신고 모달 관련 핸들러들
  const onOpenReportModal = (postNo: number) => {
    setReportPostNo(postNo);
    setShowReportModal(true);
    setActiveMenu(null); // 메뉴 닫기
  };

  const onCloseReportModal = () => {
    setShowReportModal(false);
    setReportPostNo(null);
  };

  const onReportSubmit = async (reason: ReportReasonType) => {
    if (!reportPostNo) return;
    
    try {
      const reportData = {
        targetType: 'post' as const,
        targetId: reportPostNo,
        reportReason: reason
      };

      const response = await createReport(reportData);
      
      if (response.success) {
        alert("신고가 접수되었습니다. 검토 후 처리됩니다.");
        onCloseReportModal();
      } else {
        alert(response.message || "신고 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("신고 처리 중 오류 발생:", error);
      alert("신고 처리 중 오류가 발생했습니다.");
    }
  };

  const handleLike = async (postId: number) => {
    try {
      const response = await likeDripPostQuery(postId);
      if (response.success) {
        setDripPostData(dripPostData?.map(post => {
          if (post.post_no === postId) {
            return {
              ...post,
              liked: response.liked,
              "좋아요 개수": response.likeCount
            };
          }
          return post;
        }) ?? []);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  return (
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
      isLoading={isLoading}
      currentImageIndexes={currentImageIndexes}
      currentUserId={currentUserId}
      activeMenu={activeMenu}
      isAdmin={isAdmin}
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
      onClickMoveUserProfile={onClickMoveUserProfile}
      showReportModal={showReportModal}
      reportPostNo={reportPostNo}
      onOpenReportModal={onOpenReportModal}
      onCloseReportModal={onCloseReportModal}
      onReportSubmit={onReportSubmit}
    />
  );
};

export default DripPostContainer;