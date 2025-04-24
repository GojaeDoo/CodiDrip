import * as S from "./PasswordFindResult.styled";
import * as C from "../../commons/Commons.styled";
import { PasswordFindResultProps } from "./passwordFindResult.types";

export const PasswordFindResultPresenter = (props: PasswordFindResultProps) => {
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
              onChange={props.onChangeAuthenticationNumber}
              onKeyDown={props.handleKeyDown}
            />
            {props.error && <p style={{ color: "red" }}>{props.error}</p>}
            <C.Button onClick={props.onClickSend}>확인</C.Button>
          </S.PasswordFindInputResultWrapper>
        </S.PasswordFindResultWrapper>
      </S.Background>
    </>
  );
};

export default PasswordFindResultPresenter;
