"use client";

import { useEffect, useState } from "react";
import MyPagePresenter from "./MyPage.presenter";
import { getMyPageProfileQuery } from "./MyPage.query";
import { Profile } from "./MyPage.types";
import { useRouter } from "next/navigation";

export const MyPageContainer = () => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [isLike , setIsLike] = useState(false);
  const [isSaved , setIsSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      const dripUserProfile = async () => {
        try {
          const ProfileResponse = await getMyPageProfileQuery(storedUserId);

          console.log("ProfileResponse : ", ProfileResponse);
          setUserProfile(ProfileResponse);
        } catch (error) {
          console.log(error);
        }
      };
      dripUserProfile();
    } else {
      alert("로그인 후 이용해주세요.");
    }
  }, []);

  const onClickMoveProfileEdit = () => {
    const isEditMode = true;
    router.push(`/profileEdit?Status=${isEditMode}`);
  };

  const onClickMoveDripPostEdit = () => {
    router.push("/dripPostEdit");
  };

 const onClickMoveMyDrip = () => {
    setIsLike(false);
    setIsSaved(false);
  };
  
  const onClickMoveLikedDrip = () => {
    setIsLike(true);
    setIsSaved(false);
  }
  
  const onClickMoveSavedDrip = () => {
    setIsSaved(true);
    setIsLike(false);
  }

  return (
    <>
      <MyPagePresenter
        userProfile={userProfile}
        onClickMoveProfileEdit={onClickMoveProfileEdit}
        onClickMoveDripPostEdit={onClickMoveDripPostEdit}
        onClickMoveMyDrip={onClickMoveMyDrip}
        onClickMoveLikedDrip={onClickMoveLikedDrip}
        onClickMoveSavedDrip={onClickMoveSavedDrip}
        isLike={isLike}
        isSaved={isSaved}
      />
    </>
  );
};

export default MyPageContainer;
