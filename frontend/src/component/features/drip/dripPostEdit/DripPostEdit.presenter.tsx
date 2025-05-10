import React from "react";
import * as S from "./DripPostEdit.styled";
import { ImagePlus, Hash, ChevronLeft, ChevronRight } from "lucide-react";
import { DripPostEditPresenterProps } from "./DripPostEdit.types";

const DripPostEditPresenter = (props: DripPostEditPresenterProps) => {
  return (
    <S.Background>
      <S.DripPostEditWrapper>
        <S.DripPostEditTitle>
          DRIP {props.status === true ? "수정" : "작성"}
        </S.DripPostEditTitle>
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
              {props.imageSrcList.length > 0 ? (
                <>
                  <S.MainImage
                    src={props.imageSrcList[props.currentImageIndex]}
                    alt="drip 이미지"
                  />
                  <S.DeleteButton
                    onClick={() => props.onDeleteImage(props.currentImageIndex)}
                    type="button"
                  >
                    ×
                  </S.DeleteButton>
                  {props.imageSrcList.length > 1 && (
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
          <S.SubmitButton
            onClick={props.status === true ? props.onUpdate : props.onSubmit}
            disabled={props.imageSrcList.length === 0}
          >
            {props.status === true ? "수정" : "게시"}하기
          </S.SubmitButton>
        </S.DripPostEditContent>
      </S.DripPostEditWrapper>
    </S.Background>
  );
};

export default DripPostEditPresenter;
