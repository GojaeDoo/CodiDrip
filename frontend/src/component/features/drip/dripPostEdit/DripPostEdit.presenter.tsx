import React, { RefObject } from "react";
import * as S from "./DripPostEdit.styled";
import { ImagePlus, Hash, ChevronLeft, ChevronRight } from "lucide-react";
import { DripPostEditPresenterProps } from "./DripPostEdit.types";
import PinDescriptionModal from "./PinDescriptionModal";

const DripPostEditPresenter = (props: DripPostEditPresenterProps) => {
  const {
    imageSrcList,
    currentImageIndex,
    fileInputRef,
    onImageUpload,
    onPrevImage,
    onNextImage,
    tags,
    tagInput,
    onTagInputChange,
    onKeyPress,
    onDeleteTag,
    onSubmit,
    onUpdate,
    status,
    pins,
    onAddPin,
    isAddingPin,
    onTogglePinMode,
    isModalOpen,
    selectedPinId,
    onPinClick,
    onModalClose,
    onModalSubmit,
  } = props;

  return (
    <S.Background>
      <S.DripPostEditWrapper>
        <S.DripPostEditTitle>
          DRIP {status === true ? "수정" : "작성"}
        </S.DripPostEditTitle>
        <S.DripPostEditContent>
          <S.ImageUploadSection>
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
            <S.ImagePreview>
              {imageSrcList[currentImageIndex] && (
                <>
                  <S.MainImage
                    src={imageSrcList[currentImageIndex]}
                    alt="Preview"
                    onClick={onAddPin}
                  />
                  {pins.map((pin) => (
                    <S.PinMarker
                      key={pin.id}
                      style={{
                        left: `${pin.x}%`,
                        top: `${pin.y}%`,
                        backgroundColor: isAddingPin ? "#2563eb" : "#10b981",
                      }}
                      onClick={() => onPinClick(pin.id)}
                    >
                      {pin.description && (
                        <S.PinTooltip>{pin.description}</S.PinTooltip>
                      )}
                    </S.PinMarker>
                  ))}
                </>
              )}
              <S.ImageNavigation>
                <S.NavButton onClick={onPrevImage}>
                  <ChevronLeft size={24} />
                </S.NavButton>
                <S.NavButton onClick={onNextImage}>
                  <ChevronRight size={24} />
                </S.NavButton>
              </S.ImageNavigation>
            </S.ImagePreview>
          </S.ImageUploadSection>
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
          <S.ButtonGroup>
            <S.PinButton onClick={onTogglePinMode} $isActive={isAddingPin}>
              {isAddingPin ? "핀 추가 중..." : "핀 추가"}
            </S.PinButton>
            <S.SubmitButton
              onClick={status === true ? onUpdate : onSubmit}
              disabled={imageSrcList.length === 0}
            >
              {status === true ? "수정" : "게시"}하기
            </S.SubmitButton>
          </S.ButtonGroup>
        </S.DripPostEditContent>
      </S.DripPostEditWrapper>

      <PinDescriptionModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSubmit={onModalSubmit}
        initialDescription={
          selectedPinId
            ? pins.find((pin) => pin.id === selectedPinId)?.description || ""
            : ""
        }
      />
    </S.Background>
  );
};

export default DripPostEditPresenter;
