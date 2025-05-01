import * as S from "./DripPostEdit.styled";
import { ImagePlus, Hash } from "lucide-react";

export const DripPostEditPresenter = () => {
  return (
    <>
      <S.Background>
        <S.DripPostEditWrapper>
          <S.DripPostEditTitle>DRIP 작성</S.DripPostEditTitle>
          <S.DripPostEditContent>
            <S.ImageUploadSection>
              <S.ImageUploadButton>
                <ImagePlus size={24} />
                <span>사진 추가</span>
              </S.ImageUploadButton>
              <S.ImagePreview />
            </S.ImageUploadSection>
            <S.TagSection>
              <S.TagInputWrapper>
                <Hash size={20} />
                <S.TagInput placeholder="태그를 입력하세요" />
              </S.TagInputWrapper>
              <S.TagList>{/* 태그 목록이 여기에 표시됩니다 */}</S.TagList>
            </S.TagSection>
            <S.SubmitButton>게시하기</S.SubmitButton>
          </S.DripPostEditContent>
        </S.DripPostEditWrapper>
      </S.Background>
    </>
  );
};

export default DripPostEditPresenter;
