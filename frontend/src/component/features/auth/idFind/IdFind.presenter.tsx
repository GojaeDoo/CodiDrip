import * as S from "./IdFind.styled";
import * as C from "../../../commons/Commons.styled";
import { IdFindProps } from "./IdFind.types";

export const IdFindPresenter = (props: IdFindProps) => {
  return (
    <>
      <S.Background>
        <C.SpareTitle>CODIDRIP</C.SpareTitle>
        <S.IdFindWrapper>
          <S.IdFindTitle>아이디 찾기</S.IdFindTitle>
          <S.IdInputText>가입 시 등록한 이메일을 입력해주세요.</S.IdInputText>
          <C.Input
            placeholder="이메일"
            onChange={props.onChangeEmail}
            onKeyDown={props.handleKeyDown}
          />
          <C.Button onClick={props.onClickIdFind}>아이디 찾기</C.Button>
        </S.IdFindWrapper>
      </S.Background>
    </>
  );
};

export default IdFindPresenter;
