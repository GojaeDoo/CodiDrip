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
    <S.Card>
      <S.Image src={imageUrl} alt={name} />
      <S.Info>
        <S.Name>{name}</S.Name>
        <S.Details>
          <S.Detail>키: {height}cm</S.Detail>
          <S.Detail>몸무게: {weight}kg</S.Detail>
        </S.Details>
      </S.Info>
    </S.Card>
  );
};

export default DripPostPresenter;
