import axios from 'axios';
import { AllReport } from './ReportList.types';

const API_BASE_URL = 'https://codidrip-backend.onrender.com';

// 모든 신고 목록 조회
export const fetchAllReports = async (): Promise<AllReport[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/reports/admin`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.status !== 200) {
      throw new Error('신고 목록을 불러오는데 실패했습니다.');
    }

    const data = response.data;
    return data.reports;
  } catch (error) {
    console.error('신고 목록 조회 오류:', error);
    throw error;
  }
};

// Drip 신고 목록 조회
export const fetchDripReports = async (): Promise<AllReport[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/reports/admin/drip`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.status !== 200) {
      throw new Error('Drip 신고 목록을 불러오는데 실패했습니다.');
    }

    const data = response.data;
    return data.reports;
  } catch (error) {
    console.error('Drip 신고 목록 조회 오류:', error);
    throw error;
  }
};

// 자유게시판 신고 목록 조회
export const fetchFreeBoardReports = async (): Promise<AllReport[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/reports/admin/freeboard`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.status !== 200) {
      throw new Error('자유게시판 신고 목록을 불러오는데 실패했습니다.');
    }

    const data = response.data;
    return data.reports;
  } catch (error) {
    console.error('자유게시판 신고 목록 조회 오류:', error);
    throw error;
  }
};

// 신고 처리 (삭제 또는 무시)
export const processReport = async (
  reportId: number, 
  action: 'delete' | 'ignore',
  boardType: 'drip' | 'freeboard'
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/reports/admin/${reportId}/process`, {
      action,
      boardType
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.status !== 200) {
      throw new Error('신고 처리에 실패했습니다.');
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error('신고 처리 오류:', error);
    throw error;
  }
};

// 신고된 게시글/댓글 상세 정보 조회
export const fetchReportedContent = async (
  targetId: number,
  targetType: 'post' | 'comment',
  boardType: 'drip' | 'freeboard'
): Promise<unknown> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/reports/admin/content`, {
      params: {
        targetId,
        targetType,
        boardType
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.status !== 200) {
      throw new Error('신고된 내용을 불러오는데 실패했습니다.');
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error('신고된 내용 조회 오류:', error);
    throw error;
  }
};
