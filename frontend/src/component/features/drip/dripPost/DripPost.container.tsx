"use client";

import { useEffect, useState } from "react";
import { DripPostPresenter } from "./DripPost.presenter";
import { DripPostContainerProps, DripPostPresenterProps, DripPostType, ReportReasonType } from "./DripPost.types";
import { getUserDripPostQuery, deleteDripPostQuery, postLikeDripPostQuery, postCreateReportQuery } from "./DripPost.query";
import { useRouter } from "next/navigation";
import { encodeUserId } from "@/utils/urlEncoder";
import { useAuth } from "@/context/AuthContext";

export const DripPostContainer = (props:DripPostContainerProps) => {
  const [dripPostData, setDripPostData] = useState<DripPostType[] | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>({});
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportPostNo, setReportPostNo] = useState<number | null>(null);
  const [reportReason, setReportReason] = useState<ReportReasonType | "">("");
  
    const router = useRouter();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setCurrentUserId(storedUserId);
    }
  }, []);
  
  useEffect(() => {
    const fetchDripPosts = async () => {
      if (!currentUserId && props.isMyPage) return;
      
      setIsLoading(true);
      try {
        const response = await getUserDripPostQuery(
          currentUserId,  // 로그인한 사용자 ID
          props.gender !== "all" ? props.gender : undefined,
          props.isMyPage,
          props.isLike,
          props.isSaved,
          props.selectedStyles,
          props.isMyPage ? props.userId : undefined  // 마이페이지에서 특정 사용자 필터링
        );
        setDripPostData(response);
      } catch (error) {
        console.error("Error fetching drip posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDripPosts();
  }, [props.userId, props.gender, props.isMyPage, currentUserId, props.isLike, props.isSaved, props.selectedStyles]);

  const onPrevImage: DripPostPresenterProps["onPrevImage"] = (
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

  const onNextImage: DripPostPresenterProps["onNextImage"] = (
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

  const onHidePost: DripPostPresenterProps["onHidePost"] = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    alert("게시글 숨김");
  };

  const onEditPost: DripPostPresenterProps["onEditPost"] = (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number
  ) => {
    e.preventDefault();
    const status = true;
    router.push(`/dripPostEdit?postNo=${postNo}&status=${status}`);
  };

  const onDeletePost: DripPostPresenterProps["onDeletePost"] = async (
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

  const onClickMoveUserProfile: DripPostPresenterProps["onClickMoveUserProfile"] = (e: React.MouseEvent<HTMLDivElement>, postNo: number, userId: string) => {
    e.stopPropagation();
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId === userId) {
      router.push(`/myPage`);
    } else {
      const encodedUserId = encodeUserId(userId);
      router.push(`/myPage?status=true&uid=${encodedUserId}`);
    }
  }

  const onLikeClick: DripPostPresenterProps["onLikeClick"] = (e: React.MouseEvent<HTMLButtonElement>, postNo: number) => {
    e.preventDefault();
    handleLike(postNo);
  };

  const onCommentClick: DripPostPresenterProps["onCommentClick"] = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const onMenuClick: DripPostPresenterProps["onMenuClick"] = (
    e: React.MouseEvent<HTMLButtonElement>,
    postNo: number
  ) => {
    e.preventDefault();
    setActiveMenu(activeMenu === postNo ? null : postNo);
  };

  const onClickMoveDetail: DripPostPresenterProps["onClickMoveDetail"] = (postNo: number) => {
    router.push(`/dripPostDetail?postNo=${postNo}`);
  };

  // 신고 모달 관련 핸들러들
  const onOpenReportModal: DripPostPresenterProps["onOpenReportModal"] = (postNo: number) => {
    setReportPostNo(postNo);
    setShowReportModal(true);
    setActiveMenu(null); // 메뉴 닫기
  };

  const onCloseReportModal: DripPostPresenterProps["onCloseReportModal"] = () => {
    setShowReportModal(false);
    setReportPostNo(null);
    setReportReason("");
  };

  const handleReportSubmit = () => {
    if (reportReason) {
      onReportSubmit(reportReason as ReportReasonType);
    }
  };

  const onReportSubmit: DripPostPresenterProps["onReportSubmit"] = async (reason: ReportReasonType) => {
    if (!reportPostNo) return;
    
    try {
      const reportData = {
        targetType: 'post' as const,
        targetId: reportPostNo,
        reportReason: reason
      };

      const response = await postCreateReportQuery(reportData);
      
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
      const response = await postLikeDripPostQuery(postId);
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
      onClickMoveUserProfile={onClickMoveUserProfile}
      showReportModal={showReportModal}
      reportPostNo={reportPostNo}
      onOpenReportModal={onOpenReportModal}
      onCloseReportModal={onCloseReportModal}
      onReportSubmit={onReportSubmit}
      reportReason={reportReason}
      setReportReason={setReportReason}
      handleReportSubmit={handleReportSubmit}
    />
  );
};

export default DripPostContainer;