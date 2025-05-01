"use client";

import { useEffect, useState } from "react";
import MyPagePresenter from "./MyPage.presenter";
import { getMyPageProfileQuery } from "./MyPage.query";
import { Profile } from "@/types/profile";
import { useRouter } from "next/navigation";

export const MyPageContainer = () => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      const dripUserProfile = async () => {
        try {
          const response = await getMyPageProfileQuery(storedUserId);
          console.log("response : ", response);

          setUserProfile(response);
        } catch (error) {
          console.log(error);
        }
      };
      dripUserProfile();
    } else {
    }
  }, []);

  const onClickMoveProfileEdit = () => {
    const isEditMode = true;
    router.push(`/profileEdit?Status=${isEditMode}`);
  };

  const onClickMoveDripPostEdit = () => {
    router.push("/dripPostEdit");
  };

  return (
    <>
      <MyPagePresenter
        userProfile={userProfile}
        onClickMoveProfileEdit={onClickMoveProfileEdit}
        onClickMoveDripPostEdit={onClickMoveDripPostEdit}
      />
    </>
  );
};

export default MyPageContainer;
