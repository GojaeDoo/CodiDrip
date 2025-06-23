import FreeBoardCommentContainer from "@/component/features/freeBoard/freeBoardComment/FreeBoardComment.container"
import * as S from "./FreeBoardDetail.styled"
import { FreeBoardDetailPresenterProps } from "./FreeBoardDetail.types"

export const FreeBoardDetailPresenter = (props:FreeBoardDetailPresenterProps) => {
    if (props.loading) {
        return (
            <S.Background>
                <S.FreeBoardDetailWrapper>
                    <S.LoadingContainer>
                        로딩 중...
                    </S.LoadingContainer>
                </S.FreeBoardDetailWrapper>
            </S.Background>
        )
    }

    if (!props.post) {
        return (
            <S.Background>
                <S.FreeBoardDetailWrapper>
                    <S.ErrorContainer>
                        <div>게시글을 찾을 수 없습니다.</div>
                        <S.ErrorMessage>존재하지 않는 게시글이거나 삭제된 게시글입니다.</S.ErrorMessage>
                        <S.BackButton onClick={props.onBackToList}>
                            목록으로 돌아가기
                        </S.BackButton>
                    </S.ErrorContainer>
                </S.FreeBoardDetailWrapper>
            </S.Background>
        )
    }

    return (
        <S.Background>
            <S.FreeBoardDetailWrapper>
                <S.Header>
                    <S.Title>{props.post.title}</S.Title>
                    <S.PostInfo>
                        <S.AuthorInfo>
                            <span>작성자:</span>
                            <S.Author>{props.post.author}</S.Author>
                        </S.AuthorInfo>
                        <S.DateInfo>
                            <span>{props.formatDate(props.post.createdAt)}</span>
                            <S.ViewCount>조회수: {props.post.viewCount}</S.ViewCount>
                        </S.DateInfo>
                    </S.PostInfo>
                </S.Header>

                <S.Content>
                    <S.PostContent>
                        {props.post.content}
                    </S.PostContent>
                </S.Content>

                <S.ButtonGroup>
                    <S.LeftButtons>
                        <S.BackButton onClick={props.onBackToList}>
                            목록으로
                        </S.BackButton>
                    </S.LeftButtons>
                    
                    {props.isLogin && (
                        <S.RightButtons>
                            <S.EditButton onClick={props.onEdit}>
                                수정
                            </S.EditButton>
                            <S.DeleteButton onClick={props.onDelete}>
                                삭제
                            </S.DeleteButton>
                        </S.RightButtons>
                    )}
                </S.ButtonGroup>
            </S.FreeBoardDetailWrapper>
            <FreeBoardCommentContainer withBackground={false}/>
        </S.Background>
    )
}

export default FreeBoardDetailPresenter;