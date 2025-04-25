import * as S from "./PasswordFind.styled";
import * as C from "../../../commons/Commons.styled";
import { PasswordFindProps } from "./PasswordFind.types";

export const PasswordFindPresenter = (props: PasswordFindProps) => {
  return (
    <>
      <S.Background>
        <S.PasswordFindWrapper>
          <S.PasswordFindTitle>비밀번호 찾기</S.PasswordFindTitle>
          <S.PasswordFindText>
            아이디와 이메일을 확인 후 등록된 이메일 주소로 <br />
            비밀번호 재설정을 위한 인증 메일이 발송됩니다.
          </S.PasswordFindText>
          <S.PasswordFindInputWrapper>
            <C.Input placeholder="아이디" onChange={props.onChangeId} />
            <C.Input
              placeholder="이메일"
              onChange={props.onChangeEmail}
              onKeyDown={props.handleKeyDown}
            />
          </S.PasswordFindInputWrapper>
        </S.PasswordFindWrapper>
        <C.Button onClick={props.onClickFindPassword}>비밀번호 찾기</C.Button>
      </S.Background>
    </>
  );
};

export default PasswordFindPresenter;
