import * as S from "./Login.styled";
import * as C from "../../commons/Commons.styled";

const LoginPresenter = () => {
  return (
    <>
      <S.Background>
        <C.SpareTitle>DripDrop</C.SpareTitle>
        <S.LoginWrapper>
          <S.LoginTitle>로그인</S.LoginTitle>
          <C.Input placeholder="아이디" />
          <C.Input placeholder="비밀번호" />
          <C.Button>로그인</C.Button>
          <S.MoveWrapper>
            <S.Link>아이디 찾기</S.Link>
            <S.LoginText> | </S.LoginText>
            <S.Link>비밀번호 찾기</S.Link>
            <S.LoginText> | </S.LoginText>
            <S.Link>회원가입</S.Link>
          </S.MoveWrapper>
        </S.LoginWrapper>
      </S.Background>
    </>
  );
};

export default LoginPresenter;
