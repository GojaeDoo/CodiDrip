import React from "react";
import { SearchModalPresenterProps } from "./SearchModal.types";
import * as S from "./SearchModal.styled";
import Image from "next/image";

export const SearchModalPresenter = ({
  isOpen,
  profileResults,
  postResults,
  onResultClick,
  onOverlayClick,
  onClose,
  getImageUrl
}: SearchModalPresenterProps) => {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onOverlayClick}>
      <S.ModalContent>
        <S.ModalHeader>
          <S.ModalTitle>검색 결과</S.ModalTitle>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>
        
        <S.ResultsContainer>
          {profileResults.length === 0 && postResults.length === 0 ? (
            <S.NoResults>검색 결과가 없습니다.</S.NoResults>
          ) : (
            <>
              {/* 프로필 결과 섹션 */}
              {profileResults.length > 0 && (
                <S.ProfileSection>
                  <S.SectionTitle>사용자 ({profileResults.length})</S.SectionTitle>
                  <S.ResultsGrid>
                    {profileResults.map((result, index) => (
                      <S.ResultItem 
                        key={`profile-${result.id}-${index}`}
                        onClick={() => onResultClick(result)}
                      >
                        <S.ResultImage>
                          <Image
                            src={getImageUrl(result.image, result.type)}
                            alt={result.name}
                            width={80}
                            height={80}
                            style={{ objectFit: "cover", borderRadius: "50%" }}
                            unoptimized
                          />
                        </S.ResultImage>
                        <S.ResultInfo>
                          <S.ResultName>{result.name}</S.ResultName>
                          <S.ResultType>사용자</S.ResultType>
                        </S.ResultInfo>
                      </S.ResultItem>
                    ))}
                  </S.ResultsGrid>
                </S.ProfileSection>
              )}

              {/* 포스트 결과 섹션 */}
              {postResults.length > 0 && (
                <S.PostSection>
                  <S.SectionTitle>포스트 ({postResults.length})</S.SectionTitle>
                  <S.ResultsGrid>
                    {postResults.map((result, index) => (
                      <S.ResultItem 
                        key={`post-${result.id}-${index}`}
                        onClick={() => onResultClick(result)}
                      >
                        <S.ResultImage>
                          <Image
                            src={getImageUrl(result.image, result.type)}
                            alt={result.name}
                            width={120}
                            height={120}
                            style={{ objectFit: "cover", borderRadius: "8px" }}
                            unoptimized
                          />
                        </S.ResultImage>
                        <S.ResultInfo>
                          <S.ResultName>{result.name}</S.ResultName>
                          <S.ResultType>포스트</S.ResultType>
                        </S.ResultInfo>
                      </S.ResultItem>
                    ))}
                  </S.ResultsGrid>
                </S.PostSection>
              )}
            </>
          )}
        </S.ResultsContainer>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}; 