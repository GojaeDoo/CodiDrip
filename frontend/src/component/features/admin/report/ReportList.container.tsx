"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ReportListPresenter } from './ReportList.presenter';
import { 
  fetchAllReports, 
  fetchDripReports, 
  fetchFreeBoardReports,
  processReport 
} from './ReportList.query';
import { AllReport, ReportListState, TabCounts } from './ReportList.types';

// 유틸리티 함수들
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('ko-KR');
};

const getReasonColor = (reason: string) => {
  switch (reason) {
    case '욕설': return '#ff4757';
    case '광고': return '#ffa502';
    case '도배': return '#2ed573';
    case '부적절한 사진': return '#ff6348';
    case '기타': return '#747d8c';
    default: return '#747d8c';
  }
};

const getBoardTypeLabel = (boardType: 'drip' | 'freeboard') => {
  return boardType === 'drip' ? 'Drip' : '자유게시판';
};

const getTargetTypeLabel = (targetType: 'post' | 'comment') => {
  return targetType === 'post' ? '게시글' : '댓글';
};

export const ReportListContainer = () => {
  const router = useRouter();

  // 신고된 내용 클릭 시 해당 게시글로 이동하는 함수
  const handleContentClick = (report: AllReport) => {
    if (report.board_type === 'drip') {
      if (report.target_type === 'post') {
        // Drip 게시글로 이동
        router.push(`/dripPostDetail?postNo=${report.post_id || report.target_id}`);
      } else {
        // Drip 댓글이 있는 게시글로 이동
        router.push(`/dripPostDetail?postNo=${report.post_id || report.target_id}`);
      }
    } else {
      if (report.target_type === 'post') {
        // 자유게시판 게시글로 이동
        router.push(`/freeBoardDetail?id=${report.target_id}`);
      } else {
        // 자유게시판 댓글이 있는 게시글로 이동
        router.push(`/freeBoardDetail?id=${report.post_id || report.target_id}`);
      }
    }
  };

  const [state, setState] = useState<ReportListState>({
    reports: [],
    loading: false,
    error: null,
    selectedTab: 'all',
    selectedType: 'all'
  });

  // 전체 신고 목록을 저장할 상태 추가
  const [allReports, setAllReports] = useState<AllReport[]>([]);

  // 신고 목록 로드
  const loadReports = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      let reports: AllReport[] = [];
      
      switch (state.selectedTab) {
        case 'all':
          reports = await fetchAllReports();
          setAllReports(reports); // 전체 목록 저장
          break;
        case 'drip':
          reports = await fetchDripReports();
          break;
        case 'freeboard':
          reports = await fetchFreeBoardReports();
          break;
      }
      
      setState(prev => ({ 
        ...prev, 
        reports, 
        loading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : '신고 목록을 불러오는데 실패했습니다.',
        loading: false 
      }));
    }
  };

  // 탭 변경
  const handleTabChange = (tab: 'all' | 'drip' | 'freeboard') => {
    setState(prev => ({ ...prev, selectedTab: tab }));
  };

  // 타입 필터 변경
  const handleTypeChange = (type: 'all' | 'post' | 'comment') => {
    setState(prev => ({ ...prev, selectedType: type }));
  };

  // 신고 처리
  const handleProcessReport = async (
    reportId: number, 
    action: 'delete' | 'ignore',
    boardType: 'drip' | 'freeboard'
  ) => {
    try {
      const result = await processReport(reportId, action, boardType);
      
      if (result.success) {
        // 성공 시 목록 새로고침
        await loadReports();
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('신고 처리 중 오류가 발생했습니다.');
    }
  };

  // 필터링된 신고 목록
  const filteredReports = state.reports.filter(report => {
    if (state.selectedType !== 'all' && report.target_type !== state.selectedType) {
      return false;
    }
    return true;
  });

  // 탭별 카운트 계산
  const getTabCounts = (): TabCounts => {
    const dripCount = allReports.filter(r => r.board_type === 'drip').length;
    const freeboardCount = allReports.filter(r => r.board_type === 'freeboard').length;
    return {
      all: allReports.length,
      drip: dripCount,
      freeboard: freeboardCount
    };
  };

  // 초기 로드
  useEffect(() => {
    loadReports();
  }, [state.selectedTab]);

  const tabCounts = getTabCounts();

  const presenterProps = {
    reports: filteredReports,
    loading: state.loading,
    error: state.error,
    selectedTab: state.selectedTab,
    selectedType: state.selectedType,
    tabCounts,
    onTabChange: handleTabChange,
    onTypeChange: handleTypeChange,
    onProcessReport: handleProcessReport,
    onContentClick: handleContentClick,
    onRefresh: loadReports
  };

  return <ReportListPresenter {...presenterProps} />;
};