"use client";

import { useEffect, useState } from "react";
import MyPagePresenter from "./MyPage.presenter";
import { getMyPageProfileQuery } from "./MyPage.query";
import { Profile } from "@/types/profile";

export const MyPageContainer = () => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

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
  return (
    <>
      <MyPagePresenter userProfile={userProfile} />
    </>
  );
};

export default MyPageContainer;
