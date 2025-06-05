"use client";

import { useEffect, useState } from "react";
import MyPagePresenter from "./MyPage.presenter";
import { getMyPageProfileQuery } from "./MyPage.query";
import { Profile } from "./MyPage.types";
import { useRouter } from "next/navigation";

export const MyPageContainer = () => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
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
    console.log("내 DRIP");
  }
  
  const onClickMoveLikedDrip = () => {
    console.log("좋아요한 DRIP");
  }
  
  const onClickMoveSavedDrip = () => {
    console.log("저장한 DRIP");
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
      />
    </>
  );
};

export default MyPageContainer;
