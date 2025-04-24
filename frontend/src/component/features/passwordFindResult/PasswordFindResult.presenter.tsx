import * as S from "./PasswordFindResult.styled";
import * as C from "../../commons/Commons.styled";
import { PasswordFindResultProps } from "./passwordFindResult.types";

export const PasswordFindResultPresenter = ({
  onChangeAuthenticationNumber,
  onClickSend,
  error,
}: PasswordFindResultProps) => {
  return (
    <>
      <S.Background>
        <S.PasswordFindResultWrapper>
          <S.PasswordFindResultTitle>인증번호 입력</S.PasswordFindResultTitle>
          <S.PasswordFindResultText>
            메일로 전송된 인증번호를 입력해주세요
          </S.PasswordFindResultText>
          <S.PasswordFindInputResultWrapper>
            <C.Input
              placeholder="인증번호"
              onChange={onChangeAuthenticationNumber}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <C.Button onClick={onClickSend}>확인</C.Button>
          </S.PasswordFindInputResultWrapper>
        </S.PasswordFindResultWrapper>
      </S.Background>
    </>
  );
};

export default PasswordFindResultPresenter;
