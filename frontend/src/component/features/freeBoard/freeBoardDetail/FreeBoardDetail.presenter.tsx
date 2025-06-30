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
                    
                    <S.RightButtons>
                        {props.isLogin && !props.isAuthor && !props.isAdmin && (
                            <S.ReportButton onClick={props.onReportClick}>
                                신고
                            </S.ReportButton>
                        )}
                        {props.isAuthor && (
                            <S.EditButton onClick={props.onEdit}>
                                수정
                            </S.EditButton>
                        )}
                        {(props.isAuthor || props.isAdmin) && (
                            <S.DeleteButton onClick={props.onDelete}>
                                삭제
                            </S.DeleteButton>
                        )}
                    </S.RightButtons>
                </S.ButtonGroup>
            </S.FreeBoardDetailWrapper>
            <FreeBoardCommentContainer withBackground={false}/>
            
            {/* 신고 모달 */}
            {props.showReportModal && (
                <S.ReportModalOverlay onClick={props.onCloseReportModal}>
                    <S.ReportModalContent onClick={(e) => e.stopPropagation()}>
                        <S.ReportModalTitle>게시글 신고</S.ReportModalTitle>
                        <S.ReportModalText>
                            신고 사유를 선택해주세요. 신고된 게시글은 검토 후 처리됩니다.
                        </S.ReportModalText>
                        <S.ReportReasonSelect
                            value={props.selectedReportReason}
                            onChange={props.onReportReasonChange}
                        >
                            <option value="">신고 사유를 선택하세요</option>
                            <option value="욕설">욕설</option>
                            <option value="광고">광고</option>
                            <option value="도배">도배</option>
                            <option value="부적절한 사진">부적절한 사진</option>
                            <option value="기타">기타</option>
                        </S.ReportReasonSelect>
                        <S.ReportModalButtonGroup>
                            <S.ReportModalButton onClick={props.onCloseReportModal}>
                                취소
                            </S.ReportModalButton>
                            <S.ReportModalButton 
                                $primary 
                                onClick={props.onSubmitReport}
                                disabled={!props.selectedReportReason}
                            >
                                신고하기
                            </S.ReportModalButton>
                        </S.ReportModalButtonGroup>
                    </S.ReportModalContent>
                </S.ReportModalOverlay>
            )}
        </S.Background>
    )
}

export default FreeBoardDetailPresenter;