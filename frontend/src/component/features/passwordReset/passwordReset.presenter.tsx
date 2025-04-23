import * as S from "./passwordReset.styled";
import * as C from "../../commons/Commons.styled";

export const PasswordResetPresenter = () => {
  return (
    <>
      <S.Background>
        <S.PasswordResetTitle>비밀번호 재설정</S.PasswordResetTitle>
        <S.PasswordResetWrapper>
          <S.PasswordResetSubTitle>
            새로운 비밀번호를 입력해주세요.
          </S.PasswordResetSubTitle>
          <C.Input placeholder="신규 비밀번호" />
          <S.PasswordResetSubText>
            영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리
          </S.PasswordResetSubText>
          <C.Input placeholder="신규 비밀번호 확인" />
        </S.PasswordResetWrapper>
        <C.Button>비밀번호 확인</C.Button>
      </S.Background>
    </>
  );
};

export default PasswordResetPresenter;
