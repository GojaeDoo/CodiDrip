import React from "react";
import * as S from "./DripPostEdit.styled";
import { ImagePlus, Hash, ChevronLeft, ChevronRight } from "lucide-react";
import { DripPostEditPresenterProps } from "./DripPostEdit.types";

const DripPostEditPresenter = (props: DripPostEditPresenterProps) => {
  return (
    <S.Background>
      <S.DripPostEditWrapper>
        <S.DripPostEditTitle>DRIP 작성</S.DripPostEditTitle>
        <S.DripPostEditContent>
          <S.ImageUploadSection>
            <S.ImageUploadButton
              onClick={() => props.fileInputRef.current?.click()}
            >
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
            <S.ImagePreview>
              {props.images.length > 0 ? (
                <>
                  <S.PreviewImage
                    src={props.images[props.currentImageIndex]}
                    alt="업로드된 이미지"
                  />
                  {props.images.length > 1 && (
                    <>
                      <S.NavigationButton
                        onClick={props.onPrevImage}
                        position="left"
                      >
                        <ChevronLeft size={24} />
                      </S.NavigationButton>
                      <S.NavigationButton
                        onClick={props.onNextImage}
                        position="right"
                      >
                        <ChevronRight size={24} />
                      </S.NavigationButton>
                    </>
                  )}
                </>
              ) : (
                <S.PlaceholderText>이미지를 업로드해주세요</S.PlaceholderText>
              )}
            </S.ImagePreview>
          </S.ImageUploadSection>
          <S.TagSection>
            <S.TagInputWrapper>
              <Hash size={20} />
              <S.TagInput
                type="text"
                value={props.tagInput}
                onChange={props.onTagInputChange}
                placeholder="태그를 입력하세요 (예: #태그1 #태그2)"
              />
            </S.TagInputWrapper>
            <S.TagList>
              {props.tags.map((tag, index) => (
                <S.TagItem key={index}>{tag}</S.TagItem>
              ))}
            </S.TagList>
          </S.TagSection>
          <S.SubmitButton
            onClick={props.onSubmit}
            disabled={props.images.length === 0}
          >
            게시하기
          </S.SubmitButton>
        </S.DripPostEditContent>
      </S.DripPostEditWrapper>
    </S.Background>
  );
};

export default DripPostEditPresenter;
