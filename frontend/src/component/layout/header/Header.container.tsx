"use client";
import React, { useEffect, useState } from "react";
import HeaderPresenter from "./Header.presenter";
import { useRouter } from "next/navigation";
import { fetchUserProfile,getSearchResult } from "./Header.query";
import { useAuth } from "@/context/AuthContext";
import { HeaderProps, Profile } from "./Header.types";

const HeaderContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("storedUserId : ", storedUserId);
    if (storedUserId && isLoggedIn) {
      const loadUserProfile = async () => {
        try {
          const profile = await fetchUserProfile(storedUserId);
          console.log("profile : ", profile);
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

  const onChangeSearchInput: HeaderProps["onChangeSearchInput"] = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    console.log("searchInput : ", searchInput);
  };

  const onEnterSearchInput: HeaderProps["onEnterSearchInput"] = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const response = await getSearchResult(searchInput);
      console.log("response : ", response);
      
    }
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
      onChangeSearchInput={onChangeSearchInput}
      onEnterSearchInput={onEnterSearchInput}
    />
  );
};

export default HeaderContainer;
