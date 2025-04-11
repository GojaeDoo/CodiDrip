"use client";
import * as S from "./Drips.styled";
import DripPost from "../../../app/dripPost/page";

const DripsPresenter = () => {
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
            <S.DripsSelectBtn>All</S.DripsSelectBtn>
            <S.DripsSelectBtn>MEN</S.DripsSelectBtn>
            <S.DripsSelectBtn>WOMEN</S.DripsSelectBtn>
          </S.DripsSelectWrapperBottom>
        </S.DripsSelectWrapper>
        <DripPost />
      </S.Background>
    </>
  );
};

export default DripsPresenter;
