import axios from "axios";

export const fetchDripPostCommentQuery = async (postno: number, parentId?: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/dripComment/${postno}${parentId ? `/${parentId}` : ''}`
    );
    return response.data;
  } catch (error) {
    console.error("댓글 조회 API 요청 실패:", error);
    throw error;
  }
};

export const postCommentQuery = async (userId: string, content: string, postno: number, parentId?: number) => {
  try {
    const response = await axios.post(
      `http://localhost:3005/api/dripComment`,
      {
        user_id: userId,
        content,
        post_id: postno,
        parent_id: parentId || null,
      }
    );
    return response.data;
  } catch (error) {
    console.error("댓글 작성 API 요청 실패:", error);
    throw error;
  }
};
