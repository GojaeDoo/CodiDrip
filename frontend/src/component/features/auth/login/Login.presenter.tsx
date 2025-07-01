import * as S from "./Login.styled";
import * as C from "../../../commons/Commons.styled";
import { LoginPresenterProps } from "./Login.types";
const LoginPresenter = (props: LoginPresenterProps) => {
  return (
    <>
      <S.Background>
        <C.SpareTitle>CODIDRIP</C.SpareTitle>
        <S.LoginWrapper>
          <S.LoginTitle>로그인</S.LoginTitle>
          <C.Input placeholder="아이디" onChange={props.onChangeUserId} />
          <C.Input
            placeholder="비밀번호"
            onChange={props.onChangeUserPassword}
            type="password"
            onKeyDown={props.handleKeyDown}
          />
          <C.Button onClick={props.onClickLogin}>로그인</C.Button>
          <S.MoveWrapper>
            <S.Link onClick={props.onClickMoveIdFind}>아이디 찾기</S.Link>
            <S.LoginText> | </S.LoginText>
            <S.Link onClick={props.onClickMovePasswordFind}>
              비밀번호 찾기
            </S.Link>
            <S.LoginText> | </S.LoginText>
            <S.Link onClick={props.onClickMoveJoin}>회원가입</S.Link>
          </S.MoveWrapper>
        </S.LoginWrapper>
      </S.Background>
    </>
  );
};

export default LoginPresenter;
