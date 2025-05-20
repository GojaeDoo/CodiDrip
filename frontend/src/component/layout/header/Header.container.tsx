"use client";
import React, { useEffect, useState } from "react";
import HeaderPresenter from "./Header.presenter";
import { useRouter } from "next/navigation";
import { fetchUserProfile } from "./Header.query";
import { Profile } from "@/types/profile";
import { useAuth } from "@/context/AuthContext";
import { HeaderProps } from "./Header.types";

const HeaderContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId && isLoggedIn) {
      const loadUserProfile = async () => {
        try {
          const profile = await fetchUserProfile(storedUserId);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error loading user profile:", error);
          setUserProfile(null);
        }
      };
      loadUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);

  const onClickMoveMyPage: HeaderProps["onClickMoveMyPage"] = () => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      router.push("/myPage");
    } else {
      alert("로그인 후 이용해주세요.");
      router.push("/login");
    }
  };

  const onClickMoveLogin = () => {
    router.push("/login");
  };

  const onClickMoveJoin = () => {
    router.push("/join");
  };

  const onClickMain = () => {
    router.push("/drips");
  };

  const onClickMoveDripUser = () => {
    router.push("/drips?dripUser=true");
  };

  const onClickMoveDrips = () => {
    router.push("/drips");
  };

  const onClickLogout = () => {
    logout();
  };

  return (
    <HeaderPresenter
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClickMoveMyPage={onClickMoveMyPage}
      onClickMoveLogin={onClickMoveLogin}
      onClickMoveJoin={onClickMoveJoin}
      onClickLogout={onClickLogout}
      onClickMain={onClickMain}
      onClickMoveDripUser={onClickMoveDripUser}
      onClickMoveDrips={onClickMoveDrips}
      isLoggedIn={isLoggedIn}
      userProfile={userProfile}
    />
  );
};

export default HeaderContainer;
