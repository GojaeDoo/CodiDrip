import React from "react";
import * as S from "./DripPostDetail.styled";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Hash, Share2 } from "lucide-react";
import { DripPostDetailPresenterProps } from "./DripPostDetail.types";
import DripPostComment from "../dripPostComment/DripPostComment.presenter";

const DripPostDetailPresenter = (props: DripPostDetailPresenterProps) => {
  const {
    containerRef,
    imageRef,
    aspectRatio,
    onImageLoad,
    dripPost,
    images,
    currentImageIndex,
    onPrevImage,
    onNextImage,
    postTags,
    postno,
  } = props;

  return (
    <S.Background>
      <S.DripPostDetailWrapper>
        <S.PostContainer>
          <S.ImageSection ref={containerRef}>
            <S.ImageWrapper $aspectRatio="1/1">
              {images[currentImageIndex] && (
                <>
                  <S.MainImage
                    ref={imageRef}
                    src={images[currentImageIndex]}
                    alt={`Post image ${currentImageIndex + 1}`}
                    onLoad={onImageLoad}
                  />
                  {images.length > 1 && (
                    <>
                      <S.ImageNavigation>
                        <S.NavButton onClick={onPrevImage}>
                          <ChevronLeft size={24} />
                        </S.NavButton>
                        <S.NavButton onClick={onNextImage}>
                          <ChevronRight size={24} />
                        </S.NavButton>
                      </S.ImageNavigation>
                      <S.ImageCounter>
                        {currentImageIndex + 1} / {images.length}
                      </S.ImageCounter>
                    </>
                  )}
                </>
              )}
            </S.ImageWrapper>
          </S.ImageSection>

          <S.ContentSection>
            <S.UserInfo>
              <S.ProfileImage
                src={`http://localhost:3005/uploads/profiles/${dripPost.프로필이미지}`}
                alt={`${dripPost.닉네임 || "사용자"}의 프로필`}
              />
              <div>
                <S.UserName>{dripPost.닉네임 || "사용자"}</S.UserName>
                {dripPost.키 && dripPost.몸무게 && (
                  <S.UserStats>
                    {dripPost.키}cm / {dripPost.몸무게}kg
                  </S.UserStats>
                )}
              </div>
            </S.UserInfo>

            <S.InteractionSection>
              <S.InteractionButton aria-label="좋아요">
                <Heart size={24} />
                <span>좋아요</span>
              </S.InteractionButton>
              <S.InteractionButton aria-label="댓글">
                <MessageCircle size={24} />
                <span>댓글</span>
              </S.InteractionButton>
              <S.InteractionButton aria-label="공유">
                <Share2 size={24} />
                <span>공유</span>
              </S.InteractionButton>
            </S.InteractionSection>

            <S.TagSection>
              <Hash size={20} />
              <S.TagList>
                {postTags.map((tag, index) => (
                  <S.Tag key={index}>#{tag.trim()}</S.Tag>
                ))}
              </S.TagList>
            </S.TagSection>
          </S.ContentSection>
        </S.PostContainer>

        <S.CommentSection>
          <DripPostComment postno={parseInt(postno)} />
        </S.CommentSection>
      </S.DripPostDetailWrapper>
    </S.Background>
  );
};

export default DripPostDetailPresenter;
