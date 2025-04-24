import * as S from "./passwordReset.styled";
import * as C from "../../commons/Commons.styled";
import { PasswordResetProps } from "./passwordReset.types";

export const PasswordResetPresenter = (props: PasswordResetProps) => {
  return (
    <>
      <S.Background>
        <S.PasswordResetTitle>비밀번호 재설정</S.PasswordResetTitle>
        <S.PasswordResetWrapper>
          <S.PasswordResetSubTitle>
            새로운 비밀번호를 입력해주세요.
          </S.PasswordResetSubTitle>
          <C.Input
            type="password"
            placeholder="신규 비밀번호"
            onChange={props.onChangePassword}
          />
          <S.PasswordResetSubText>
            영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리
          </S.PasswordResetSubText>
          <C.Input
            type="password"
            placeholder="신규 비밀번호 확인"
            onChange={props.onChangePasswordCheck}
            onKeyDown={props.handleKeyDown}
          />
          {props.error && <S.ErrorMessage>{props.error}</S.ErrorMessage>}
        </S.PasswordResetWrapper>
        <C.Button onClick={props.onClickResetPassword}>
          비밀번호 재설정
        </C.Button>
      </S.Background>
    </>
  );
};

export default PasswordResetPresenter;
