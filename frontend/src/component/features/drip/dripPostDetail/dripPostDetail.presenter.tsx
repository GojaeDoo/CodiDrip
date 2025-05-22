import React from "react";
import * as S from "./DripPostDetail.styled";
import { DripPostDetailProps, Pin } from "./DripPostDetail.types";
import { Heart, MessageCircle, Hash, Share2 } from "lucide-react";
import DripPostComment from "@/app/dripPostComment/page";

const DripPostDetailPresenter: React.FC<DripPostDetailProps> = ({
  dripPost,
  images,
  currentImageIndex,
  onPrevImage,
  onNextImage,
  getImageUrl,
  postTags,
  pins,
  postno,
}) => {
  return (
    <S.Background>
      <S.DripPostDetailWrapper>
        <S.PostContainer>
          <S.ImageSection>
            <S.MainImage
              src={getImageUrl(images[currentImageIndex])}
              alt={`Post image ${currentImageIndex + 1}`}
            />
            {pins?.map((pin: Pin) => (
              <S.PinContainer key={pin.id} x={pin.x} y={pin.y}>
                <S.PinMarker></S.PinMarker>
                <S.PinDescription>{pin.description}</S.PinDescription>
              </S.PinContainer>
            ))}
            {images.length > 1 && (
              <>
                <S.ImageNavigation>
                  <S.NavButton onClick={onPrevImage}>
                    <S.StyledChevronLeft />
                  </S.NavButton>
                  <S.NavButton onClick={onNextImage}>
                    <S.StyledChevronRight />
                  </S.NavButton>
                </S.ImageNavigation>
                <S.ImageCounter>
                  {currentImageIndex + 1} / {images.length}
                </S.ImageCounter>
              </>
            )}
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
                <Heart size={22} />
                <span>좋아요</span>
              </S.InteractionButton>
              <S.InteractionButton aria-label="댓글">
                <MessageCircle size={22} />
                <span>댓글</span>
              </S.InteractionButton>
              <S.InteractionButton aria-label="공유">
                <Share2 size={22} />
                <span>공유</span>
              </S.InteractionButton>
            </S.InteractionSection>

            <S.TagSection>
              <Hash size={20} />
              <S.TagList>
                {postTags.map((tag: string, index: number) => (
                  <S.Tag key={index}>#{tag.trim()}</S.Tag>
                ))}
              </S.TagList>
            </S.TagSection>

            <DripPostComment postno={postno} />
          </S.ContentSection>
        </S.PostContainer>
      </S.DripPostDetailWrapper>
    </S.Background>
  );
};

export default DripPostDetailPresenter;
