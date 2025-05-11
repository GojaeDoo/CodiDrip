import React from "react";
import * as S from "./dripPostDetail.styled";
import { Heart, MessageCircle, Share2, Hash } from "lucide-react";
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
                props.postImages[0]
                  ? `http://localhost:3005/uploads/drip/${props.postImages[0]}`
                  : undefined
              }
              alt="Drip post image"
            />
            <S.ImageNavigation>
              <S.NavButton>
                <S.StyledChevronLeft size={24} />
              </S.NavButton>
              <S.NavButton>
                <S.StyledChevronRight size={24} />
              </S.NavButton>
            </S.ImageNavigation>
          </S.ImageSection>

          <S.ContentSection>
            <S.UserInfo>
              <S.ProfileImage
                src={`http://localhost:3005/uploads/profiles/${props.dripPost?.프로필이미지}`}
                alt="User profile"
              />
              <S.UserName>{props.dripPost?.닉네임 || "사용자"}</S.UserName>
            </S.UserInfo>

            <S.InteractionSection>
              <S.InteractionButton>
                <Heart size={24} />
                <span>좋아요</span>
              </S.InteractionButton>
              <S.InteractionButton>
                <MessageCircle size={24} />
                <span>댓글</span>
              </S.InteractionButton>
              <S.InteractionButton>
                <Share2 size={24} />
                <span>공유</span>
              </S.InteractionButton>
            </S.InteractionSection>

            <S.TagSection>
              <Hash size={20} />
              <S.TagList>
                {props.postTags.map((tag: string, index: number) => (
                  <S.Tag key={index}>{tag}</S.Tag>
                )) || <S.Tag>#태그 없음</S.Tag>}
              </S.TagList>
            </S.TagSection>

            <DripPostComment />
          </S.ContentSection>
        </S.PostContainer>
      </S.DripPostDetailWrapper>
    </S.Background>
  );
};

export default DripPostDetailPresenter;
