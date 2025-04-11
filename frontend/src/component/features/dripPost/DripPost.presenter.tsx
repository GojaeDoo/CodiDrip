"use client";

import React from "react";
import { Heart } from "lucide-react";
import * as S from "./DripPost.styled";
import { DripPostPresenterProps } from "./DripPost.types";

const DripPostPresenter: React.FC<DripPostPresenterProps> = ({
  profiles,
  likedProfiles,
  onLike,
}) => {
  return (
    <S.Container>
      {profiles.map((profile, index) => (
        <S.DripPostContainer key={profile.profile_id}>
          <S.CardNumber>{String(index + 1)}</S.CardNumber>
          <S.LikeButton onClick={() => onLike(profile.profile_id)}>
            <S.HeartIcon $isLiked={likedProfiles.has(profile.profile_id)}>
              <Heart />
            </S.HeartIcon>
          </S.LikeButton>
          <S.PostImage
            src={profile.profile_image || ""}
            alt={profile.profile_nickname}
          />
          <S.PostInfo>
            <S.ProfileDetailsContainer>
              <S.ProfileImage
                src={profile.profile_image || ""}
                alt={`${profile.profile_nickname}'s profile`}
              />
              <S.ProfileInfo>
                <S.ProfileName>{profile.profile_nickname}</S.ProfileName>
                <S.ProfileDetail>
                  {profile.profile_height}cm • {profile.profile_weight}kg •{" "}
                  {profile.profile_gender}
                </S.ProfileDetail>
              </S.ProfileInfo>
            </S.ProfileDetailsContainer>
          </S.PostInfo>
        </S.DripPostContainer>
      ))}
    </S.Container>
  );
};

export default DripPostPresenter;
