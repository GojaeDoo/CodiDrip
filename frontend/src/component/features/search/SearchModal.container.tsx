import React, { useState, useEffect } from "react";
import { SearchModalPresenter } from "./SearchModal.presenter";
import { SearchModalProps } from "./SearchModal.types";
import { useRouter } from "next/navigation";
import { encodeUserId } from "@/utils/urlEncoder";

interface SearchResult {
  type: 'profile' | 'post';
  id: number;
  name: string;
  image: string;
  user_id: string;
}

export const SearchModalContainer = ({ 
  isOpen, 
  onClose, 
  searchResults 
}: SearchModalProps) => {
  const router = useRouter();

  const getImageUrl = (imagePath: string, type: 'profile' | 'post') => {
    if (!imagePath) {
      return "/images/profile/default-profile.png";
    }
    
    if (type === 'profile') {
      return `http://localhost:3005/uploads/profiles/${imagePath}`;
    } else {
      return `http://localhost:3005/uploads/drip/${imagePath}`;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    console.log("result : ", result);
    if (result.type === 'profile') {
      const encodedUserId = encodeUserId(result.user_id);
      router.push(`/myPage?status=true&uid=${encodedUserId}`);
    } else if (result.type === 'post') {
      // 포스트 상세 페이지로 이동
      router.push(`/dripPostDetail?postNo=${result.id}`);
    }
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 검색 결과를 타입별로 분리
  const profileResults = searchResults.filter(result => result.type === 'profile');
  const postResults = searchResults.filter(result => result.type === 'post');

  return (
    <SearchModalPresenter
      isOpen={isOpen}
      profileResults={profileResults}
      postResults={postResults}
      onResultClick={handleResultClick}
      onOverlayClick={handleOverlayClick}
      onClose={onClose}
      getImageUrl={getImageUrl}
    />
  );
}; 