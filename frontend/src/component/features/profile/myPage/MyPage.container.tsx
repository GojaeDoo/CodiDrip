"use client";

import { useEffect, useState } from "react";
import { MyPagePresenter } from "./MyPage.presenter";
import { MyPageProps, FreeBoardPost } from "./MyPage.types";
import { getMyPageProfileQuery, getDripPostDetailQuery, checkFollowStatusQuery, toggleFollowQuery, getUserFreeBoardPostsQuery } from "./MyPage.query";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeUserId } from "@/utils/urlEncoder";
import { useAuth } from "@/context/AuthContext";

export const MyPageContainer = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const [userProfile, setUserProfile] = useState<MyPageProps["userProfile"]>(null);
  const [activeTab, setActiveTab] = useState<'myDrip' | 'liked' | 'saved' | 'follower' | 'following' | 'myPost'>('myDrip');
  const [isFollowing, setIsFollowing] = useState(false);
  const [freeBoardPosts, setFreeBoardPosts] = useState<FreeBoardPost[]>([]);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [isFreeBoardLoading, setIsFreeBoardLoading] = useState(false);
  const [isMyPageLoading, setIsMyPageLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const queryStringStatus = searchParams.get("status");
    const encodedUserId = searchParams.get("uid");
    
    if (!storedUserId) {
      alert("로그인 후 이용해주세요.");
      return;
    }
   
    const fetchData = async () => {
      setIsMyPageLoading(true);
      try {
        if (queryStringStatus === "true") {
          let targetUserId: string;
          targetUserId = decodeUserId(encodedUserId || "");
          const profileResponse = await getMyPageProfileQuery(targetUserId);
          setUserProfile(profileResponse);
          console.log("profileResponse : ", profileResponse);
          
          const followStatus = await checkFollowStatusQuery(storedUserId, targetUserId);
          setIsFollowing(followStatus);
        } else {
          const profileResponse = await getMyPageProfileQuery(storedUserId);
          setUserProfile(profileResponse);
          console.log("profileResponse : ", profileResponse);
          setIsFollowing(false); // 내 마이페이지에서는 팔로우 상태 불필요
        }
      } catch (error) {
        console.log("error : ", error);
      } finally {
        setIsMyPageLoading(false);
      }
    };
   
    fetchData();
  }, [searchParams]);

  // 자유게시판 게시글 가져오기
  useEffect(() => {
    const fetchFreeBoardPosts = async () => {
      if (activeTab === 'myPost' && userProfile) {
        setIsFreeBoardLoading(true);
        try {
          const posts = await getUserFreeBoardPostsQuery(userProfile.user_id);
          setFreeBoardPosts(posts);
        } catch (error) {
          console.log("자유게시판 게시글 조회 오류:", error);
        } finally {
          setIsFreeBoardLoading(false);
        }
      }
    };

    fetchFreeBoardPosts();
  }, [activeTab, userProfile]);

  // 팔로우 탭 로딩 상태 관리 (예시: 1초 후 로딩 해제)
  useEffect(() => {
    if (activeTab === 'follower' || activeTab === 'following') {
      setIsFollowLoading(true);
      const timer = setTimeout(() => setIsFollowLoading(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsFollowLoading(false);
    }
  }, [activeTab]);

  const onClickMoveProfileEdit = () => {
    const isEditMode = true;
    router.push(`/profileEdit?Status=${isEditMode}`);
  };

  const onClickLogout = () => {
    logout();
    router.push("/login");
  };

  const onClickFollow = async () => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId || !userProfile) return;

    try {
      await toggleFollowQuery(storedUserId, userProfile.user_id);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("팔로우 토글 실패:", error);
      alert("팔로우 처리 중 오류가 발생했습니다.");
    }
  };

  const onClickMoveDripPostEdit = () => {
    router.push("/dripPostEdit");
  };

  const onClickMoveMyDrip = () => {
    setActiveTab('myDrip');
  };

  const onClickMoveLikedDrip = () => {
    setActiveTab('liked');
  };

  const onClickMoveSavedDrip = () => {
    setActiveTab('saved');
  };

  const onClickMoveFollower = () => {
    setActiveTab('follower');
  };

  const onClickMoveFollowing = () => {
    setActiveTab('following');
  };

  const onClickMoveMyPost = () => {
    setActiveTab('myPost');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  const onClickFreeBoardPost = (postId: number) => {
    router.push(`/freeBoardDetail?id=${postId}`);
  };

  return (
    <MyPagePresenter
      userProfile={userProfile}
      isMyPage={true}
      isOwnProfile={!searchParams.get("status")}
      isFollowing={isFollowing}
      isMyDrip={activeTab === 'myDrip'}
      isLike={activeTab === 'liked'}
      isSaved={activeTab === 'saved'}
      isFollower={activeTab === 'follower'}
      isFollowingTab={activeTab === 'following'}
      isMyPost={activeTab === 'myPost'}
      activeFollowTab={activeTab === 'follower' ? 'followers' : 'following'}
      freeBoardPosts={freeBoardPosts}
      formatDate={formatDate}
      onClickMoveProfileEdit={onClickMoveProfileEdit}
      onClickFollow={onClickFollow}
      onClickMoveDripPostEdit={onClickMoveDripPostEdit}
      onClickMoveMyDrip={onClickMoveMyDrip}
      onClickMoveLikedDrip={onClickMoveLikedDrip}
      onClickMoveSavedDrip={onClickMoveSavedDrip}
      onClickMoveFollower={onClickMoveFollower}
      onClickMoveFollowing={onClickMoveFollowing}
      onClickMoveMyPost={onClickMoveMyPost}
      onClickFreeBoardPost={onClickFreeBoardPost}
      onClickLogout={onClickLogout}
      isFollowLoading={isFollowLoading}
      isFreeBoardLoading={isFreeBoardLoading}
      isMyPageLoading={isMyPageLoading}
    />
  );
};

export default MyPageContainer;
