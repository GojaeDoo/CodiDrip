import React from "react";
import * as S from "./dripPostDetail.styled";
import { Heart, MessageCircle, Bookmark, Hash } from "lucide-react";
import { DripPostDetailProps } from "./dripPostDetail.types";
import DripPostComment from "@/app/dripPostComment/page";

export const DripPostDetailPresenter = (props: DripPostDetailProps) => {
  return (
    <S.Background>
      <S.DripPostDetailWrapper>
        <S.PostContainer>
          <S.ImageSection>
            <S.MainImage
              src={
                props.postImages[props.currentImageIndex]
                  ? `http://localhost:3005/uploads/drip/${
                      props.postImages[props.currentImageIndex]
                    }`
                  : undefined
              }
              alt="Drip post image"
            />
            {props.postImages.length > 1 && (
              <>
                <S.ImageNavigation>
                  <S.NavButton
                    onClick={() => props.onPrevImage(props.postImages.length)}
                    aria-label="이전 이미지"
                  >
                    <S.StyledChevronLeft size={24} />
                  </S.NavButton>
                  <S.NavButton
                    onClick={() => props.onNextImage(props.postImages.length)}
                    aria-label="다음 이미지"
                  >
                    <S.StyledChevronRight size={24} />
                  </S.NavButton>
                </S.ImageNavigation>
                <S.ImageCounter>
                  {props.currentImageIndex + 1} / {props.postImages.length}
                </S.ImageCounter>
              </>
            )}
          </S.ImageSection>

          <S.ContentSection>
            <S.UserInfo>
              <S.ProfileImage
                src={`http://localhost:3005/uploads/profiles/${props.dripPost?.프로필이미지}`}
                alt={`${props.dripPost?.닉네임 || "사용자"}의 프로필`}
              />
              <div>
                <S.UserName>{props.dripPost?.닉네임 || "사용자"}</S.UserName>
                {props.dripPost?.키 && props.dripPost?.몸무게 && (
                  <S.UserStats>
                    {props.dripPost.키}cm / {props.dripPost.몸무게}kg
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
              <S.InteractionButton aria-label="저장">
                <Bookmark size={22} />
                <span>저장</span>
              </S.InteractionButton>
            </S.InteractionSection>

            <S.TagSection>
              <Hash size={20} />
              <S.TagList>
                {props.postTags.length > 0 ? (
                  props.postTags.map((tag: string, index: number) => (
                    <S.Tag key={index}>#{tag}</S.Tag>
                  ))
                ) : (
                  <S.Tag>#태그 없음</S.Tag>
                )}
              </S.TagList>
            </S.TagSection>

            <DripPostComment postno={Number(props.postno)} />
          </S.ContentSection>
        </S.PostContainer>
      </S.DripPostDetailWrapper>
    </S.Background>
  );
};

export default DripPostDetailPresenter;
