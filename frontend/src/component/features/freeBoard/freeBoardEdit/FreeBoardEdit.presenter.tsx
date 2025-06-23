import * as S from "./FreeBoardEdit.styled";
import { FreeBoardEditPresenterProps } from "./FreeBoardEdit.types";

export const FreeBoardEditPresenter = (props:FreeBoardEditPresenterProps) => {
  return (
    <>
      <S.Background>
        <S.FreeBoardEditWrapper>
          <S.Header>
            <S.Title>{props.status ? "자유게시판 수정" : "자유게시판 작성"}</S.Title>
          </S.Header>
          
          <S.Form>
            <S.InputGroup>
              <S.Label htmlFor="title">제목</S.Label>
              <S.TitleInput
                id="title"
                type="text"
                placeholder="제목을 입력해주세요"
                maxLength={100}
                required
                onChange={props.onChangeTitle}
                value={props.title}
              />
              <S.CharacterCount>
                {props.titleLength}/100
              </S.CharacterCount>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label htmlFor="content">내용</S.Label>
              <S.ContentTextarea
                id="content"
                placeholder="내용을 입력해주세요"
                maxLength={5000}
                required
                onChange={props.onChangeContent}
                value={props.content}
              />
              <S.CharacterCount>
                {props.contentLength}/5000
              </S.CharacterCount>
            </S.InputGroup>

            <S.ButtonGroup>
              <S.CancelButton type="button" onClick={props.onClickCancel}>
                취소
              </S.CancelButton>
              <S.SubmitButton type="button" onClick={props.onClickSend}>
                {props.status ? "수정" : "등록"}
              </S.SubmitButton>
            </S.ButtonGroup>
          </S.Form>
        </S.FreeBoardEditWrapper>
      </S.Background>
    </>
  );
};

export default FreeBoardEditPresenter;