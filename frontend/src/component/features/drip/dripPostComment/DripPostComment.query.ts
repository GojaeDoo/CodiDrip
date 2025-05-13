import axios from "axios";

export const fetchDripPostCommentQuery = async (postNo: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/drip/${postNo}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("댓글 조회 API 요청 실패:", error);
    throw error;
  }
};
