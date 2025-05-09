"use client";
import * as S from "./Drips.styled";
import { DripsProps } from "./Drips.types";
import { DripPost } from "@/app/dripPost/page";

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
          <DripPost />
        </S.DripPostWrapper>
      </S.Background>
    </>
  );
};

export default DripsPresenter;
