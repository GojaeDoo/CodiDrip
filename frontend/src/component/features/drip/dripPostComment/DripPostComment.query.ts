import axios from "axios"

export const postCommentQuery = async (postno: number, user_id: string, content: string, parent_id?: string) => {
  const response = await axios.post(`http://localhost:3005/api/drip/${postno}/comments`, {
    post_id: postno,
    user_id: user_id,
    content: content,
    parent_id: parent_id
  })
  return response.data;
}

export const getCommentQuery = async (postno: number, user_id: string) => {
  console.log('Fetching comments:', { postno, user_id });
  const response = await axios.get(`http://localhost:3005/api/drip/${postno}/comments?userId=${user_id}`);
  console.log('Comments response:', JSON.stringify(response.data, null, 2));
  return response.data;
}

export const updateCommentQuery = async (commentId: number, content: string) => {
  const response = await axios.put(`http://localhost:3005/api/drip/comments/${commentId}`, {
    content: content
  })
  return response.data;
}

export const deleteCommentQuery = async (commentId: number) => {
  const response = await axios.delete(`http://localhost:3005/api/drip/comments/${commentId}`);
  return response.data;
}

export const likeCommentQuery = async (commentId: number, user_id: string) => {
  console.log('Sending like request:', { commentId, user_id });
  const response = await axios.post(`http://localhost:3005/api/drip/comments/${commentId}/like?userId=${user_id}`);
  console.log('Like response:', response.data);
  return response.data;
};

export const unlikeCommentQuery = async (commentId: number, user_id: string) => {
  console.log('Sending unlike request:', { commentId, user_id });
  try {
    const response = await axios.delete(`http://localhost:3005/api/drip/comments/${commentId}/like?userId=${user_id}`);
    console.log('Unlike response:', response.data);
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

  const response = await axios.post(`http://localhost:3005/api/reports`, {
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
