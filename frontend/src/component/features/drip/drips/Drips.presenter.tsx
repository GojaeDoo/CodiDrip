"use client";
import * as S from "./Drips.styled";
import { DripsPresenterProps } from "./Drips.types";
import { DripPost } from "@/app/dripPost/page";
import { DripUser } from "@/app/dripUser/page";

const DripsPresenter = (props: DripsPresenterProps) => {
  const styleCategories = [
    "일상복", "빈티지", "스트릿", "미니멀", "오피스룩", "아메카지", "캐주얼", "포멀", "Y2K"
  ];

  return (
    <>
      <S.Background>
        <S.DripsSelectWrapper>
          <S.DripsSelectWrapperTop>
            <S.DripsSelectWrapperTopTitle>
              {props.isDripUser === true ? "Drip 사용자" : "Drip 게시글"}
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
            <S.DripsSelectBtn 
              onClick={props.onClickSelectStyleCategory}
              $isActive={props.showStyleFilter}
            >
              STYLE
            </S.DripsSelectBtn>
            
            {/* 스타일 필터 드롭다운 */}
            {props.showStyleFilter && (
              <S.StyleFilterDropdown>
                <S.StyleFilterTitle>스타일 카테고리 선택</S.StyleFilterTitle>
                <S.StyleFilterList>
                  {styleCategories.map((style) => (
                    <S.StyleFilterItem key={style}>
                      <S.StyleCheckbox
                        type="checkbox"
                        id={style}
                        checked={props.selectedStyles.includes(style)}
                        onChange={() => props.onStyleChange(style)}
                      />
                      <S.StyleLabel htmlFor={style}>{style}</S.StyleLabel>
                    </S.StyleFilterItem>
                  ))}
                </S.StyleFilterList>
                <S.StyleFilterClose onClick={props.onCloseStyleFilter}>
                  닫기
                </S.StyleFilterClose>
              </S.StyleFilterDropdown>
            )}
          </S.DripsSelectWrapperBottom>
        </S.DripsSelectWrapper>
        <S.DripPostWrapper>
          {props.isDripUser ? (
            <DripUser gender={props.genderSelect} />
          ) : (
            <DripPost 
              gender={props.genderSelect} 
              isMyPage={false}
              selectedStyles={props.selectedStyles}
            />
          )}
        </S.DripPostWrapper>
      </S.Background>
    </>
  );
};

export default DripsPresenter;
