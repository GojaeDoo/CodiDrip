"use client";

import React from "react";
import { Heart } from "lucide-react";
import { DripPostPresenterProps } from "./DripPost.types";
import * as S from "./DripPost.styled";

const DripPostPresenter: React.FC<DripPostPresenterProps> = ({
  imageUrl,
  profileImageUrl,
  name,
  height,
  weight,
  cardNumber = 1,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <S.DripPostContainer>
      <S.CardNumber>{cardNumber}</S.CardNumber>
      <S.LikeButton onClick={() => setIsLiked(!isLiked)}>
        <S.HeartIcon $isLiked={isLiked}>
          <Heart />
        </S.HeartIcon>
      </S.LikeButton>
      <S.PostImage src={imageUrl} alt={name} />
      <S.PostInfo>
        <S.ProfileDetailsContainer>
          <S.ProfileImage src={profileImageUrl} alt={`${name}'s profile`} />
          <S.ProfileInfo>
            <S.ProfileName>{name}</S.ProfileName>
            <S.ProfileDetail>
              {height}cm • {weight}kg
            </S.ProfileDetail>
          </S.ProfileInfo>
        </S.ProfileDetailsContainer>
      </S.PostInfo>
    </S.DripPostContainer>
  );
};

export default DripPostPresenter;
