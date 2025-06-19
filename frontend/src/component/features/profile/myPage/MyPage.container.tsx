"use client";

import { useEffect, useState } from "react";
import { MyPagePresenter } from "./MyPage.presenter";
import { MyPageProps } from "./MyPage.types";
import { getMyPageProfileQuery, getDripPostDetailQuery, checkFollowStatusQuery, toggleFollowQuery } from "./MyPage.query";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeUserId } from "@/utils/urlEncoder";

export const MyPageContainer = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<MyPageProps["userProfile"]>(null);
  const [activeTab, setActiveTab] = useState<'myDrip' | 'liked' | 'saved' | 'follower' | 'following'>('myDrip');
  const [isFollowing, setIsFollowing] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const queryStringStatus = searchParams.get("status");
    const encodedUserId = searchParams.get("uid");
    const queryStringPostNo = searchParams.get("postNo");
    
    if (!storedUserId) {
      alert("로그인 후 이용해주세요.");
      return;
    }
   
    const fetchData = async () => {
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
      }
    };
   
    fetchData();
  }, [searchParams]);

  const onClickMoveProfileEdit = () => {
    const isEditMode = true;
    router.push(`/profileEdit?Status=${isEditMode}`);
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

  return (
    <MyPagePresenter
      userProfile={userProfile}
      isMyPage={!searchParams.get("status")}
      isFollowing={isFollowing}
      isMyDrip={activeTab === 'myDrip'}
      isLike={activeTab === 'liked'}
      isSaved={activeTab === 'saved'}
      isFollower={activeTab === 'follower'}
      isFollowingTab={activeTab === 'following'}
      activeFollowTab={activeTab === 'follower' ? 'followers' : 'following'}
      onClickMoveProfileEdit={onClickMoveProfileEdit}
      onClickFollow={onClickFollow}
      onClickMoveDripPostEdit={onClickMoveDripPostEdit}
      onClickMoveMyDrip={onClickMoveMyDrip}
      onClickMoveLikedDrip={onClickMoveLikedDrip}
      onClickMoveSavedDrip={onClickMoveSavedDrip}
      onClickMoveFollower={onClickMoveFollower}
      onClickMoveFollowing={onClickMoveFollowing}
    />
  );
};

export default MyPageContainer;
