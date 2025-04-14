"use client";

import { Heart } from "lucide-react";
import * as S from "./DripPost.styled";
import { DripPostPresenterProps } from "./DripPost.types";

const DripPostPresenter = (props: DripPostPresenterProps) => {
  return (
    <S.Container>
      {props.profiles.map((profile) => (
        <S.DripPostContainer key={profile.profile_id}>
          <S.LikeButton onClick={() => props.onLike(profile.profile_id)}>
            <S.HeartIcon $isLiked={props.likedProfiles.has(profile.profile_id)}>
              <Heart />
            </S.HeartIcon>
          </S.LikeButton>
          <S.PostImage
            src={`http://localhost:3005/uploads/profiles/${profile.profile_image}`}
            alt={profile.profile_nickname}
          />
          <S.PostInfo>
            <S.ProfileDetailsContainer>
              <S.ProfileImage
                src={`http://localhost:3005/uploads/profiles/${profile.profile_image}`}
                alt={`${profile.profile_nickname}'s profile`}
              />
              <S.ProfileInfo>
                <S.ProfileName>{profile.profile_nickname}</S.ProfileName>
                <S.ProfileDetail>
                  {profile.profile_height}cm • {profile.profile_weight}kg
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
