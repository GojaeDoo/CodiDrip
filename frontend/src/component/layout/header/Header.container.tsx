"use client";
import React, { useEffect, useState } from "react";
import HeaderPresenter from "./Header.presenter";
import { useRouter } from "next/navigation";
import { fetchUserProfile,getSearchResult } from "./Header.query";
import { checkUserAdminStatus } from "@/component/features/auth/login/Login.query";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { HeaderProps, Profile } from "./Header.types";
import { SearchModalContainer } from "@/component/features/search/SearchModal.container";
import { SearchResult } from "@/component/features/search/SearchModal.types";

const HeaderContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

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

      // 관리자 상태 확인
      const checkAdminStatus = async () => {
        try {
          const adminStatus = await checkUserAdminStatus(storedUserId);
          console.log("adminStatus : ", adminStatus);
          setIsAdmin(adminStatus?.is_admin || false);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      };
      checkAdminStatus();
    } else {
      setUserProfile(null);
      setIsAdmin(false);
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

  const onClickMoveLogin: HeaderProps["onClickMoveLogin"] = () => {
    router.push("/login");
  };

  const onClickMoveJoin: HeaderProps["onClickMoveJoin"] = () => {
    router.push("/join");
  };

  const onClickMain: HeaderProps["onClickMain"] = () => {
    router.push("/drips");
  };

  const onClickMoveDripUser: HeaderProps["onClickMoveDripUser"] = () => {
    router.push("/drips?dripUser=true");
  };

  const onClickMoveDrips:HeaderProps["onClickMoveDrips"] = () => {
    router.push("/drips");
  };

  const onClickMoveFreeBoardList = () => {
    router.push("/freeBoardList");
  }

  const onClickMoveReportList = () => {
    router.push("/reportList");
  }

  const onChangeSearchInput: HeaderProps["onChangeSearchInput"] = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onEnterSearchInput: HeaderProps["onEnterSearchInput"] = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim()) {
      try {
        const response = await getSearchResult(searchInput);
        console.log("response : ", response);
        setSearchResults(response);
        setIsSearchModalOpen(true);
      } catch (error) {
        console.error("검색 중 오류 발생:", error);
        alert("검색 중 오류가 발생했습니다.");
      }
    }
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchResults([]);
  };

  return (
    <>
      <HeaderPresenter
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClickMoveMyPage={onClickMoveMyPage}
        onClickMoveLogin={onClickMoveLogin}
        onClickMoveJoin={onClickMoveJoin}
        onClickMain={onClickMain}
        onClickMoveDripUser={onClickMoveDripUser}
        onClickMoveDrips={onClickMoveDrips}
        isLoggedIn={isLoggedIn}
        userProfile={userProfile}
        isAdmin={isAdmin}
        onChangeSearchInput={onChangeSearchInput}
        onEnterSearchInput={onEnterSearchInput}
        onClickMoveFreeBoardList={onClickMoveFreeBoardList}
        onClickMoveReportList={onClickMoveReportList}
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <SearchModalContainer
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
        searchResults={searchResults}
      />
    </>
  );
};

export default HeaderContainer;
