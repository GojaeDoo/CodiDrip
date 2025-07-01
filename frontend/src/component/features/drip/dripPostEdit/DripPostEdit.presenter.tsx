import React from "react";
import * as S from "./DripPostEdit.styled";
import { ImagePlus, Hash, ChevronLeft, ChevronRight, X } from "lucide-react";
import { DripPostEditPresenterProps } from "./DripPostEdit.types";

const DripPostEditPresenter = (
  props: DripPostEditPresenterProps & {
    containerRef: React.RefObject<HTMLDivElement>;
  }
) => {
  

  return (
    <S.Background>
      <S.DripPostEditWrapper>
        <S.PostContainer>
          {/* 이미지 영역 */}
          <S.ImageSection>
            <S.ImageWrapper ref={props.containerRef} $aspectRatio={props.aspectRatio}>
              {props.imageSrcList[props.currentImageIndex] && (
                <>
                  <S.MainImage
                    ref={props.imageRef}
                    src={props.imageSrcList[props.currentImageIndex]}
                    alt="Preview"
                    onLoad={props.onImageLoad}
                  />
                  <S.DeleteImageButton
                    onClick={() => props.onDeleteImage(props.currentImageIndex)}
                    type="button"
                  >
                    <X size={24} />
                  </S.DeleteImageButton>
                  {props.imageSrcList.length > 1 && (
                    <>
                      <S.ImageNavigation>
                        <S.NavButton onClick={props.onPrevImage}>
                          <ChevronLeft size={24} />
                        </S.NavButton>
                        <S.NavButton onClick={props.onNextImage}>
                          <ChevronRight size={24} />
                        </S.NavButton>
                      </S.ImageNavigation>
                    </>
                  )}
                </>
              )}
            </S.ImageWrapper>
          </S.ImageSection>

          {/* 입력/설정 영역 */}
          <S.ContentSection>
            <S.DripPostEditTitle>
              DRIP {props.status === true ? "수정" : "작성"}
            </S.DripPostEditTitle>
            <S.ImageUploadButton onClick={() => props.fileInputRef.current?.click()}>
              <ImagePlus size={24} />
              <span>사진 추가</span>
            </S.ImageUploadButton>
            <input
              type="file"
              ref={props.fileInputRef}
              onChange={props.onImageUpload}
              accept="image/*"
              multiple
              style={{ display: "none" }}
            />
            <S.TagSection>
              <S.TagInputWrapper>
                <Hash size={20} />
                <S.TagInput
                  type="text"
                  value={props.tagInput}
                  onChange={props.onTagInputChange}
                  onKeyPress={props.onKeyPress}
                  placeholder="태그를 입력하세요 (쉼표 또는 엔터로 구분)"
                />
              </S.TagInputWrapper>
              <S.TagList>
                {props.tags.map((tag, index) => (
                  <S.TagItem key={index}>
                    {tag}
                    <S.TagDeleteButton
                      onClick={() => props.onDeleteTag(index)}
                      type="button"
                    >
                      ×
                    </S.TagDeleteButton>
                  </S.TagItem>
                ))}
              </S.TagList>
            </S.TagSection>
            <S.StyleCategorySection>
              <S.StyleCategoryLabel>스타일 카테고리 *</S.StyleCategoryLabel>
              <S.StyleCategorySelect
                value={props.styleCategory}
                onChange={props.onStyleCategoryChange}
                required
              >
                <option value="">스타일을 선택해주세요</option>
                <option value="일상복">일상복</option>
                <option value="빈티지">빈티지</option>
                <option value="스트릿">스트릿</option>
                <option value="미니멀">미니멀</option>
                <option value="오피스룩">오피스룩</option>
                <option value="아메카지">아메카지</option>
                <option value="캐주얼">캐주얼</option>
                <option value="포멀">포멀</option>
                <option value="Y2K">Y2K</option>
              </S.StyleCategorySelect>
            </S.StyleCategorySection>
            <S.ButtonGroup>
              <S.SubmitButton
                onClick={props.status === true ? props.onUpdate : props.onSubmit}
                disabled={props.imageSrcList.length === 0 || !props.styleCategory}
              >
                {props.status === true ? "수정" : "게시"}하기
              </S.SubmitButton>
            </S.ButtonGroup>
          </S.ContentSection>
        </S.PostContainer>
      </S.DripPostEditWrapper>
    </S.Background>
  );
};

export default DripPostEditPresenter;
