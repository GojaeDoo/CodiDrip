import React from "react";
import * as S from "./dripPostDetail.styled";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Bookmark } from "lucide-react";
import { DripPostDetailPresenterProps } from "./dripPostDetail.types";
import DripPostCommentContainer from "../dripPostComment/DripPostComment.container";

const DripPostDetailPresenter = (props: DripPostDetailPresenterProps) => {
  return (
    <S.Background>
      <S.DripPostDetailWrapper>
        <S.MainSection>
          <S.ImageBox>
            <S.ImageWrapper $aspectRatio="1/1">
              {props.images[props.currentImageIndex] && (
                <>
                  <S.MainImage
                    ref={props.imageRef}
                    src={props.images[props.currentImageIndex]}
                    alt={`Post image ${props.currentImageIndex + 1}`}
                    onLoad={props.onImageLoad}
                    onError={(e) => {
                      e.currentTarget.src = "/images/profile/default-profile.png";
                    }}
                  />
                  {props.images.length > 1 && (
                    <>
                      <S.ImageNavigation>
                        <S.NavButton onClick={props.onPrevImage}>
                          <ChevronLeft size={24} />
                        </S.NavButton>
                        <S.NavButton onClick={props.onNextImage}>
                          <ChevronRight size={24} />
                        </S.NavButton>
                      </S.ImageNavigation>
                      <S.ImageCounter>
                        {props.currentImageIndex + 1} / {props.images.length}
                      </S.ImageCounter>
                    </>
                  )}
                </>
              )}
            </S.ImageWrapper>
          </S.ImageBox>

          <S.ProfileBox>
            <S.UserInfo>
              <S.ProfileImage
                src={`https://codidrip-backend.onrender.com/uploads/profiles/${props.dripPost.프로필이미지}`}
                alt={`${props.dripPost.닉네임 || "사용자"}의 프로필`}
              />
              <div>
                <S.UserName>{props.dripPost.닉네임 || "사용자"}</S.UserName>
                {props.dripPost.키 && props.dripPost.몸무게 && (
                  <S.UserStats>
                    {props.dripPost.키}cm / {props.dripPost.몸무게}kg
                  </S.UserStats>
                )}
              </div>
            </S.UserInfo>
            <S.InteractionSection>
              <S.InteractionButton 
                aria-label="좋아요" 
                onClick={props.onLikeClick}
                $isLiked={props.isLiked}
              >
                <Heart 
                  size={24} 
                  strokeWidth={2}
                />
                <span>좋아요 {props.likeCount}</span>
              </S.InteractionButton>
              <S.InteractionButton 
                aria-label="댓글"
                onClick={props.onCommentClick}
              >
                <MessageCircle size={24} />
                <span>댓글작성</span>
              </S.InteractionButton>
              <S.InteractionButton aria-label="저장" onClick={props.handleClickSave} $isSaved={props.isSaved}>
                <Bookmark size={24} />
                <span>저장</span>
              </S.InteractionButton>
            </S.InteractionSection>
          </S.ProfileBox>

          <S.TagBox>
            <S.TagList>
              {props.postTags.map((tag, index) => (
                <S.Tag key={index}>#{tag.trim()}</S.Tag>
              ))}
            </S.TagList>
          </S.TagBox>
        </S.MainSection>
        
        <S.CommentSection>
          <DripPostCommentContainer postno={parseInt(props.postno)} />
        </S.CommentSection>
      </S.DripPostDetailWrapper>
    </S.Background>
  );
};

export default DripPostDetailPresenter;
