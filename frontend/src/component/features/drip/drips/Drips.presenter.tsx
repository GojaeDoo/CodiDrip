"use client";
import * as S from "./Drips.styled";
import { DripsProps } from "./Drips.types";
import { DripPostContainer } from "../dripPost/DripPost.container";

const DripsPresenter = (props: DripsProps) => {
  return (
    <>
      <S.Background>
        <S.DripsSelectWrapper>
          <S.DripsSelectWrapperTop>
            <S.DripsSelectWrapperTopTitle>
              Drip Rank
            </S.DripsSelectWrapperTopTitle>
          </S.DripsSelectWrapperTop>
          <S.DripsSelectWrapperBottom>
            <S.DripsSelectBtn onClick={props.onClickSelectAll}>
              All
            </S.DripsSelectBtn>
            <S.DripsSelectBtn onClick={props.onClickSelectMen}>
              MEN
            </S.DripsSelectBtn>
            <S.DripsSelectBtn onClick={props.onClickSelectWomen}>
              WOMEN
            </S.DripsSelectBtn>
          </S.DripsSelectWrapperBottom>
        </S.DripsSelectWrapper>
        <S.DripPostWrapper>
          <DripPostContainer />
        </S.DripPostWrapper>
      </S.Background>
    </>
  );
};

export default DripsPresenter;
