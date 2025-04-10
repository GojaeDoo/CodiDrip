"use client";

import React from "react";
import { DripPostPresenterProps } from "./DripPost.types";
import * as S from "./DripPost.styled";

const DripPostPresenter: React.FC<DripPostPresenterProps> = ({
  imageUrl,
  name,
  height,
  weight,
}) => {
  return (
    <S.DripPostContainer>
      <S.PostImage src={imageUrl} alt={name} />
      <S.PostInfo>
        <S.ProfileName>{name}</S.ProfileName>
        <S.ProfileDetails>
          <S.ProfileDetail>키: {height}cm</S.ProfileDetail>
          <S.ProfileDetail>몸무게: {weight}kg</S.ProfileDetail>
        </S.ProfileDetails>
      </S.PostInfo>
    </S.DripPostContainer>
  );
};

export default DripPostPresenter;
