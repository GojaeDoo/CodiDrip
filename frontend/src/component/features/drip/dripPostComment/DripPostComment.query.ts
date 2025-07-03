import axios from "axios"
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const postCommentQuery = async (postno: number, user_id: string, content: string, parent_id?: string) => {
  const response = await axios.post(`${API_ENDPOINTS.DRIP}/${postno}/comments`, {
    post_id: postno,
    user_id: user_id,
    content: content,
    parent_id: parent_id
  })
  return response.data;
}

export const getCommentQuery = async (postno: number, user_id: string) => {
  const response = await axios.get(`${API_ENDPOINTS.DRIP}/${postno}/comments?userId=${user_id}`);
  return response.data;
}

export const putUpdateCommentQuery = async (commentId: number, content: string) => {
  const response = await axios.put(`${API_ENDPOINTS.DRIP}/comments/${commentId}`, {
    content: content
  })
  return response.data;
}

export const deleteCommentQuery = async (commentId: number) => {
  const response = await axios.delete(`${API_ENDPOINTS.DRIP}/comments/${commentId}`);
  return response.data;
}

export const getLikeCommentQuery = async (commentId: number, user_id: string) => {
  const response = await axios.post(`${API_ENDPOINTS.DRIP}/comments/${commentId}/like?userId=${user_id}`);
  return response.data;
};

export const getUnlikeCommentQuery = async (commentId: number, user_id: string) => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.DRIP}/comments/${commentId}/like?userId=${user_id}`);
    return response.data;
  } catch (error) {
    console.error('Unlike error:', error);
    throw error;
  }
};

// 드립 댓글 신고 기능
export const reportCommentQuery = async (commentId: number, reportReason: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  const response = await axios.post(`${API_ENDPOINTS.REPORTS}`, {
    targetType: 'comment',
    targetId: commentId,
    reportReason: reportReason
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.data;
};
