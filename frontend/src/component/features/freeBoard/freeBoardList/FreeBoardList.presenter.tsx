import React from "react";
import * as S from "./FreeBoardList.styled";
import { FreeBoardListPresenterProps } from "./FreeBoardList.types";

export const FreeBoardListPresenter = (props:FreeBoardListPresenterProps) => {
  return (
    <S.Background>
      <S.FreeBoardListWrapper>
        <S.Header>
          <S.Title>자유게시판</S.Title>
          <S.Subtitle>자유롭게 의견을 나누는 공간입니다</S.Subtitle>
        </S.Header>

        <S.Content>
          <S.TopBar>
            <S.SearchContainer>
              <S.SearchInput
                type="text"
                placeholder="제목 또는 내용으로 검색..."
                value={props.searchQuery}
                onChange={props.onSearchInputChange}
                onKeyPress={props.onSearchKeyPress}
              />
              <S.SearchButton onClick={props.onClickSearch}>
                검색
              </S.SearchButton>
            </S.SearchContainer>
            <S.WriteButton onClick={props.onWriteClick}>
              글쓰기
            </S.WriteButton>
          </S.TopBar>

          <S.BoardTable>
            <S.TableHeader>
              <div style={{textAlign: "center"}}>번호</div>
              <div style={{textAlign: "center"}}>제목</div>
              <div style={{textAlign: "center"}}>작성자</div>
              <div style={{textAlign: "center"}}>작성일</div>
              <div style={{textAlign: "center"}}>조회수</div>
            </S.TableHeader>

            {props.posts.length === 0 ? (
              <S.NoPosts>
                게시글이 없습니다.
              </S.NoPosts>
            ) : (
              props.posts.map((post , index) => (
                <S.TableRow key={post.id} onClick={() => props.onPostClick(post.id)}>
                  <S.Cell className="pc-only">{index + 1}</S.Cell>
                  <S.TitleCell>{post.title}</S.TitleCell>
                  <S.AuthorCell className="pc-only">{post.author}</S.AuthorCell>
                  <S.DateCell className="pc-only">{props.formatDate(post.createdAt)}</S.DateCell>
                  <S.ViewCell className="pc-only">{post.viewCount}</S.ViewCell>
                  <S.MetaRow className="mobile-only">
                    <span>{post.author}</span>
                    <span>{props.formatDate(post.createdAt)}</span>
                    <span>조회 {post.viewCount}</span>
                  </S.MetaRow>
                </S.TableRow>
              ))
            )}
          </S.BoardTable>

          {props.totalPages > 1 && (
            <S.Pagination>
              {props.renderPagination()}
              <S.PageInfo>
                {props.currentPage} / {props.totalPages} 페이지
              </S.PageInfo>
            </S.Pagination>
          )}
        </S.Content>
      </S.FreeBoardListWrapper>
    </S.Background>
  );
};

export default FreeBoardListPresenter;