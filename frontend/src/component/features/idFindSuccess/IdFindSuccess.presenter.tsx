import * as S from "./IdFindSuccess.styled";
import * as C from "../../../component/commons/Commons.styled";
import { IdFindSuccessProps } from "./IdFindSuccess.types";

export const IdFindSuccessPresenter = (props: IdFindSuccessProps) => {
  return (
    <S.Background>
      <S.IdFindSuccessWrapper>
        <S.IdFindSuccessImage src="/images/idFind/IdFindSuccess-image.png" />
        <S.IdFindSuccessText>
          입력하신 정보와 일치하는 아이디입니다.
        </S.IdFindSuccessText>
        <S.Input disabled placeholder={props.id} />
        <C.Button onClick={props.onClickLogin}>확인</C.Button>
      </S.IdFindSuccessWrapper>
    </S.Background>
  );
};

export default IdFindSuccessPresenter;
