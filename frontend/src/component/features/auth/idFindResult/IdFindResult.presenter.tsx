import * as S from "./IdFindResult.styled";
import * as C from "../../../commons/Commons.styled";
import { IdFindResultPresenterProps } from "./IdFindResult.types";

export const IdFindResultPresenter = (props: IdFindResultPresenterProps) => {
  return (
    <S.Background>
      <S.IdFindSuccessWrapper>
        {props.imageName && <S.IdFindSuccessImage src={props.imageName} />}
        <S.IdFindSuccessText>{props.text}</S.IdFindSuccessText>
        <S.Input disabled placeholder={props.id} />
        <C.Button onClick={props.onClickLogin}>확인</C.Button>
      </S.IdFindSuccessWrapper>
    </S.Background>
  );
};

export default IdFindResultPresenter;
