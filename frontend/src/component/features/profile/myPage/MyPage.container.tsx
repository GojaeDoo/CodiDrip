"use client";

import { useEffect, useState } from "react";
import { MyPagePresenter } from "./MyPage.presenter";
import { MyPageProps } from "./MyPage.types";
import { getMyPageProfileQuery } from "./MyPage.query";
import { useRouter } from "next/navigation";

export const MyPageContainer = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<MyPageProps["userProfile"]>(null);
  const [activeTab, setActiveTab] = useState<'myDrip' | 'liked' | 'saved' | 'follower' | 'following'>('myDrip');

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
   
    if (!storedUserId) {
      alert("로그인 후 이용해주세요.");
      return;
    }
   
    const fetchData = async () => {
      try {
        const profileResponse = await getMyPageProfileQuery(storedUserId);
        setUserProfile(profileResponse);
        console.log("profileResponse : ", profileResponse);
      } catch (error) {
        console.log("error : ", error);
      }
    };
   
    fetchData();
  }, []);

  const onClickMoveProfileEdit = () => {
    const isEditMode = true;
    router.push(`/profileEdit?Status=${isEditMode}`);
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
      isMyDrip={activeTab === 'myDrip'}
      isLike={activeTab === 'liked'}
      isSaved={activeTab === 'saved'}
      isFollower={activeTab === 'follower'}
      isFollowing={activeTab === 'following'}
      onClickMoveProfileEdit={onClickMoveProfileEdit}
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
