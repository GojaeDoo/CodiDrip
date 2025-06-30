import React from "react";
import * as S from "./DripPostEdit.styled";
import { ImagePlus, Hash, ChevronLeft, ChevronRight, X } from "lucide-react";
import { DripPostEditPresenterProps } from "./DripPostEdit.types";

const DripPostEditPresenter = (
  props: DripPostEditPresenterProps & {
    containerRef: React.RefObject<HTMLDivElement>;
  }
) => {
  const {
    containerRef,
    imageSrcList,
    currentImageIndex,
    fileInputRef,
    onImageUpload,
    onPrevImage,
    onNextImage,
    onDeleteImage,
    tags,
    tagInput,
    onTagInputChange,
    onKeyPress,
    onDeleteTag,
    styleCategory,
    onStyleCategoryChange,
    onSubmit,
    onUpdate,
    status,
    imageRef,
    aspectRatio,
    onImageLoad,
  } = props;

  return (
    <S.Background>
      <S.DripPostEditWrapper>
        <S.PostContainer>
          {/* 이미지 영역 */}
          <S.ImageSection>
            <S.ImageWrapper ref={containerRef} $aspectRatio={aspectRatio}>
              {imageSrcList[currentImageIndex] && (
                <>
                  <S.MainImage
                    ref={imageRef}
                    src={imageSrcList[currentImageIndex]}
                    alt="Preview"
                    onLoad={onImageLoad}
                  />
                  <S.DeleteImageButton
                    onClick={() => onDeleteImage(currentImageIndex)}
                    type="button"
                  >
                    <X size={24} />
                  </S.DeleteImageButton>
                  {imageSrcList.length > 1 && (
                    <>
                      <S.ImageNavigation>
                        <S.NavButton onClick={onPrevImage}>
                          <ChevronLeft size={24} />
                        </S.NavButton>
                        <S.NavButton onClick={onNextImage}>
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
              DRIP {status === true ? "수정" : "작성"}
            </S.DripPostEditTitle>
            <S.ImageUploadButton onClick={() => fileInputRef.current?.click()}>
              <ImagePlus size={24} />
              <span>사진 추가</span>
            </S.ImageUploadButton>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onImageUpload}
              accept="image/*"
              multiple
              style={{ display: "none" }}
            />
            <S.TagSection>
              <S.TagInputWrapper>
                <Hash size={20} />
                <S.TagInput
                  type="text"
                  value={tagInput}
                  onChange={onTagInputChange}
                  onKeyPress={onKeyPress}
                  placeholder="태그를 입력하세요 (쉼표 또는 엔터로 구분)"
                />
              </S.TagInputWrapper>
              <S.TagList>
                {tags.map((tag, index) => (
                  <S.TagItem key={index}>
                    {tag}
                    <S.TagDeleteButton
                      onClick={() => onDeleteTag(index)}
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
                value={styleCategory}
                onChange={onStyleCategoryChange}
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
                onClick={status === true ? onUpdate : onSubmit}
                disabled={imageSrcList.length === 0 || !styleCategory}
              >
                {status === true ? "수정" : "게시"}하기
              </S.SubmitButton>
            </S.ButtonGroup>
          </S.ContentSection>
        </S.PostContainer>
      </S.DripPostEditWrapper>
    </S.Background>
  );
};

export default DripPostEditPresenter;
