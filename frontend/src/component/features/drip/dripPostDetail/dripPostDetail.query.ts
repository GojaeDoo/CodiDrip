import axios from "axios";
import { DripPostDetailResponse } from "./DripPostDetail.types";

export const getDripPostDetail = async (
  postNo: number
): Promise<DripPostDetailResponse> => {
  try {
    console.log("Fetching drip post with postNo:", postNo);
    const response = await axios.get(
      `http://localhost:3005/api/drip/${postNo}`
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching drip post:", error);
    throw error;
  }
};

export const getDripPostLikeStatus = async (postNo: number, userId: string) => {
  const response = await axios.get(`http://localhost:3005/api/drip/like-status`, {
    params: { post_no: postNo, user_id: userId }
  });
  return response.data.is_liked;
};

export const likeDripPostQuery = async (postNo: number, userId: string) => {
  try {
    const response = await axios.post(`http://localhost:3005/api/drip/${postNo}/like`, {
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error("게시글 좋아요 실패:", error);
    throw error;
  }
};

export const unlikeDripPostQuery = async (postNo: number, userId: string) => {
  try {
    const response = await axios.delete(`http://localhost:3005/api/drip/${postNo}/like`, {
      data: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    console.error("게시글 좋아요 취소 실패:", error);
    throw error;
  }
};