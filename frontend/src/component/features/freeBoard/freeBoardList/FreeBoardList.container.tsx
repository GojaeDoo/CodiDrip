"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FreeBoardListPresenter } from "./FreeBoardList.presenter";
import { FreeBoardPost } from "./FreeBoardList.types";
import { getFreeBoardList, getFreeBoardSearch } from "./FreeBoardList.query";
import * as S from "./FreeBoardList.styled";

const POSTS_PER_PAGE = 10;

export const FreeBoardListContainer = () => {
  const [posts, setPosts] = useState<FreeBoardPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<FreeBoardPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 자유게시판 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getFreeBoardList();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("자유게시판 목록 조회 오류:", error);
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

  const handleSearch = async () => {
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    
    try {
      if (searchQuery.trim() === "") {
        // 검색어가 없으면 전체 목록 가져오기
        const data = await getFreeBoardList();
        setPosts(data);
        setFilteredPosts(data);
      } else {
        // 검색어가 있으면 검색 API 호출
        const searchData = await getFreeBoardSearch(searchQuery);
        setFilteredPosts(searchData);
      }
    } catch (error) {
      console.error("검색 오류:", error);
      alert("검색에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onPostClick = (postId: number) => {
    router.push(`/freeBoardDetail?id=${postId}`);
  };

  const onWriteClick = () => {
    router.push("/freeBoardEdit");
  };

  if (loading) {
    return (
      <S.Background>
        <S.FreeBoardListWrapper>
          <S.Header>
            <S.Title>자유게시판</S.Title>
            <S.Subtitle>자유롭게 의견을 나누는 공간입니다</S.Subtitle>
          </S.Header>
          <S.Content>
            <div style={{ textAlign: 'center', padding: '2rem', color: '#fff' }}>
              로딩 중...
            </div>
          </S.Content>
        </S.FreeBoardListWrapper>
      </S.Background>
    );
  }

  return (
    <FreeBoardListPresenter
      posts={currentPosts}
      currentPage={currentPage}
      totalPages={totalPages}
      searchQuery={searchQuery}
      onClickSearch={handleSearch}
      onPageChange={onPageChange}
      onPostClick={onPostClick}
      onWriteClick={onWriteClick}
      onSearchInputChange={onSearchInputChange}
      onSearchKeyPress={onSearchKeyPress}
      formatDate={formatDate}
      renderPagination={renderPagination}
    />
  );
};

export default FreeBoardListContainer;