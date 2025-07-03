import axios from "axios";

export const getFreeBoardDetailQuery = async (id: number) => {
  const response = await axios.get(`https://codidrip-backend.onrender.com/api/freeboard/${id}`);
  return response.data;
};

export const deleteFreeBoardWriteQuery = async (id: number) => {
  const response = await axios.delete(`https://codidrip-backend.onrender.com/api/freeboard/${id}`);
  return response.data;
};

// 자유게시판 게시글 신고 기능
export const reportFreeBoardPostQuery = async (postId: number, reportReason: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  const response = await axios.post(`https://codidrip-backend.onrender.com/api/reports/freeboard`, {
    target_type: 'post',
    target_id: postId,
    report_reason: reportReason
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.data;
};