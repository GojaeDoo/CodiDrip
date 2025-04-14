"use client";
import * as S from "./Drips.styled";
import DripPost from "../../../app/dripPost/page";
import { DripsProps } from "./Drips.types";

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
        <DripPost genderSelect={props.genderSelect} />
      </S.Background>
    </>
  );
};

export default DripsPresenter;
