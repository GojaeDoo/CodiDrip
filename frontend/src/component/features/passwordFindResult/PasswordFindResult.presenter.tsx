import * as S from "./PasswordFindResult.styled";
import * as C from "../../commons/Commons.styled";
export const PasswordFindResultPresenter = () => {
  return (
    <>
      <S.Background>
        <S.PasswordFindResultWrapper>
          <S.PasswordFindResultTitle>인증번호 입력</S.PasswordFindResultTitle>
          <S.PasswordFindResultText>
            메일로 전송된 인증번호를 입력해주세요
          </S.PasswordFindResultText>
          <S.PasswordFindInputResultWrapper>
            <C.Input placeholder="인증번호" />
            <C.Button>확인</C.Button>
          </S.PasswordFindInputResultWrapper>
        </S.PasswordFindResultWrapper>
      </S.Background>
    </>
  );
};

export default PasswordFindResultPresenter;
