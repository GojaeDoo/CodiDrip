"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FreeBoardListPresenter } from "./FreeBoardList.presenter";
import { FreeBoardPost } from "./FreeBoardList.types";
import * as S from "./FreeBoardList.styled";

// 임시 데이터 (나중에 API로 교체)
const mockPosts: FreeBoardPost[] = [
  {
    id: 1,
    title: "안녕하세요! 자유게시판에 처음 와봤어요",
    author: "새내기",
    createdAt: "2024-01-15T10:30:00Z",
    viewCount: 45
  },
  {
    id: 2,
    title: "오늘 날씨가 정말 좋네요",
    author: "날씨맨",
    createdAt: "2024-01-15T09:15:00Z",
    viewCount: 23
  },
  {
    id: 3,
    title: "프로그래밍 공부하는 분들 계신가요?",
    author: "코딩초보",
    createdAt: "2024-01-15T08:45:00Z",
    viewCount: 67
  },
  {
    id: 4,
    title: "맛집 추천해주세요!",
    author: "맛집탐험가",
    createdAt: "2024-01-14T18:20:00Z",
    viewCount: 89
  },
  {
    id: 5,
    title: "영화 추천 부탁드려요",
    author: "영화광",
    createdAt: "2024-01-14T16:30:00Z",
    viewCount: 34
  },
  {
    id: 6,
    title: "운동하는 분들 있나요?",
    author: "헬스맨",
    createdAt: "2024-01-14T14:15:00Z",
    viewCount: 56
  },
  {
    id: 7,
    title: "책 추천해주세요",
    author: "독서광",
    createdAt: "2024-01-14T12:00:00Z",
    viewCount: 78
  },
  {
    id: 8,
    title: "여행 계획 세우는 중입니다",
    author: "여행자",
    createdAt: "2024-01-14T10:30:00Z",
    viewCount: 42
  },
  {
    id: 9,
    title: "음악 추천 부탁드려요",
    author: "음악애호가",
    createdAt: "2024-01-14T09:00:00Z",
    viewCount: 91
  },
  {
    id: 10,
    title: "게임하는 분들 계신가요?",
    author: "게이머",
    createdAt: "2024-01-14T07:30:00Z",
    viewCount: 123
  }
];

const POSTS_PER_PAGE = 10;

export const FreeBoardListContainer = () => {
  const [posts] = useState<FreeBoardPost[]>(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState<FreeBoardPost[]>(mockPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 이전 페이지 버튼
    if (currentPage > 1) {
      pages.push(
        <S.PageButton key="prev" onClick={() => onPageChange(currentPage - 1)}>
          이전
        </S.PageButton>
      );
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <S.PageButton
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </S.PageButton>
      );
    }

    // 다음 페이지 버튼
    if (currentPage < totalPages) {
      pages.push(
        <S.PageButton key="next" onClick={() => onPageChange(currentPage + 1)}>
          다음
        </S.PageButton>
      );
    }

    return pages;
  };

  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostClick = (postId: number) => {
    router.push(`/freeBoardDetail?id=${postId}`);
  };

  const handleWriteClick = () => {
    router.push("/freeBoardEdit");
  };

  return (
    <FreeBoardListPresenter
      posts={currentPosts}
      currentPage={currentPage}
      totalPages={totalPages}
      searchQuery={searchQuery}
      onSearch={handleSearch}
      onPageChange={onPageChange}
      onPostClick={handlePostClick}
      onWriteClick={handleWriteClick}
      onSearchInputChange={handleSearchInputChange}
      onSearchKeyPress={handleSearchKeyPress}
      formatDate={formatDate}
      renderPagination={renderPagination}
    />
  );
};

export default FreeBoardListContainer;