import axios from "axios"

export const postCommentQuery = async (postno: number, user_id: string, commentContent: string) => {
  const response = await axios.post(`http://localhost:3005/api/drip/${postno}/comments`,{
    post_id: postno,
    user_id: user_id,
    content: commentContent,
    parent_id: null,
  })
  return response.data;
}

export const getCommentQuery = async (postno: number, userId?: string) => {
  const response = await axios.get(`http://localhost:3005/api/drip/${postno}/comments`, {
    params: userId ? { userId } : undefined
  });
  return response.data;
}

export const updateCommentQuery = async (id: number, content: string) => {
  const response = await axios.put(`http://localhost:3005/api/drip/comments/${id}`,{
    id:id,
    content: content
  })
  return response.data;
}

export const deleteCommentQuery = async (commentId: number) => {
  const response = await axios.delete(`http://localhost:3005/api/drip/comments/${commentId}`);
  return response.data;
}

export const likeCommentQuery = async (commentId: number, userId: string) => {
  const response = await axios.post(
    `http://localhost:3005/api/drip/comments/${commentId}/like`,
    { user_id: userId }
  );
  return response.data;
};

export const unlikeCommentQuery = async (commentId: number, userId: string) => {
  const response = await axios.delete(
    `http://localhost:3005/api/drip/comments/${commentId}/like`,
    { data: { user_id: userId } }
  );
  return response.data;
};
