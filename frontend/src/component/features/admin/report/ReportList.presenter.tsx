import * as S from "./ReportList.styled";
import { ReportListPresenterProps } from "./ReportList.types";

export const ReportListPresenter = ({
  reports,
  loading,
  error,
  selectedTab,
  selectedType,
  tabCounts,
  onTabChange,
  onTypeChange,
  onProcessReport,
  onContentClick,
  onRefresh
}: ReportListPresenterProps) => {
  if (loading) {
    return (
      <>
        <S.ReportListGlobalStyle />
        <S.Background>
          <S.ReportListWrapper>
            <S.LoadingContainer>
              <S.LoadingSpinner />
              <p>신고 목록을 불러오는 중...</p>
            </S.LoadingContainer>
          </S.ReportListWrapper>
        </S.Background>
      </>
    );
  }

  if (error) {
    return (
      <>
        <S.ReportListGlobalStyle />
        <S.Background>
          <S.ReportListWrapper>
            <S.ErrorContainer>
              <p>오류: {error}</p>
              <S.RefreshButton onClick={onRefresh}>다시 시도</S.RefreshButton>
            </S.ErrorContainer>
          </S.ReportListWrapper>
        </S.Background>
      </>
    );
  }

  return (
    <>
      <S.ReportListGlobalStyle />
      <S.Background>
        <S.ReportListWrapper>
          <S.Header>
            <h1>신고함</h1>
            <S.RefreshButton onClick={onRefresh}>새로고침</S.RefreshButton>
          </S.Header>

          <S.TabContainer>
            <S.TabButton 
              active={selectedTab === 'all' ? 'true' : 'false'} 
              onClick={() => onTabChange('all')}
            >
              전체 ({tabCounts.all})
            </S.TabButton>
            <S.TabButton 
              active={selectedTab === 'drip' ? 'true' : 'false'} 
              onClick={() => onTabChange('drip')}
            >
              Drip ({tabCounts.drip})
            </S.TabButton>
            <S.TabButton 
              active={selectedTab === 'freeboard' ? 'true' : 'false'} 
              onClick={() => onTabChange('freeboard')}
            >
              자유게시판 ({tabCounts.freeboard})
            </S.TabButton>
          </S.TabContainer>

          <S.FilterContainer>
            <S.FilterButton 
              active={selectedType === 'all' ? 'true' : 'false'} 
              onClick={() => onTypeChange('all')}
            >
              전체
            </S.FilterButton>
            <S.FilterButton 
              active={selectedType === 'post' ? 'true' : 'false'} 
              onClick={() => onTypeChange('post')}
            >
              게시글
            </S.FilterButton>
            <S.FilterButton 
              active={selectedType === 'comment' ? 'true' : 'false'} 
              onClick={() => onTypeChange('comment')}
            >
              댓글
            </S.FilterButton>
          </S.FilterContainer>

          <S.ReportList>
            {reports.length === 0 ? (
              <S.EmptyState>
                <p>신고된 내용이 없습니다.</p>
              </S.EmptyState>
            ) : (
              reports.map((report) => (
                <S.ReportItem key={report.report_id}>
                  <S.ReportHeader>
                    <S.ReportInfo>
                      <S.BoardType boardType={report.board_type}>
                        {report.board_type === 'drip' ? 'Drip' : '자유게시판'}
                      </S.BoardType>
                      <S.TargetType>
                        {report.target_type === 'post' ? '게시글' : '댓글'}
                      </S.TargetType>
                      <S.ReportReason color={report.report_reason === '욕설' ? '#ff4757' : 
                                           report.report_reason === '광고' ? '#ffa502' :
                                           report.report_reason === '도배' ? '#2ed573' :
                                           report.report_reason === '부적절한 사진' ? '#ff6348' : '#747d8c'}>
                        {report.report_reason}
                      </S.ReportReason>
                    </S.ReportInfo>
                    <S.ReportDate>
                      {new Date(report.created_at).toLocaleString('ko-KR')}
                    </S.ReportDate>
                  </S.ReportHeader>

                  <S.ReportContent>
                    <S.ContentPreview 
                      onClick={() => onContentClick(report)}
                      clickable={!!report.target_content}
                    >
                      {report.target_content ? (
                        report.target_content.length > 100 
                          ? `${report.target_content.substring(0, 100)}...` 
                          : report.target_content
                      ) : (
                        '신고된 내용을 불러올 수 없습니다.'
                      )}
                    </S.ContentPreview>
                  </S.ReportContent>

                  <S.ReportFooter>
                    <S.ReportDetails>
                      <span>신고자: {report.reporter_nickname || report.reporter_id}</span>
                      {report.target_author && (
                        <span>작성자: {report.target_author}</span>
                      )}
                    </S.ReportDetails>
                    <S.ActionButtons>
                      <S.ActionButton 
                        danger 
                        onClick={() => onProcessReport(report.report_id, 'delete', report.board_type)}
                      >
                        삭제
                      </S.ActionButton>
                      <S.ActionButton 
                        onClick={() => onProcessReport(report.report_id, 'ignore', report.board_type)}
                      >
                        무시
                      </S.ActionButton>
                    </S.ActionButtons>
                  </S.ReportFooter>
                </S.ReportItem>
              ))
            )}
          </S.ReportList>
        </S.ReportListWrapper>
      </S.Background>
    </>
  );
};