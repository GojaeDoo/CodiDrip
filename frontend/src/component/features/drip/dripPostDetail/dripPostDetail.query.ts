import axios from "axios";
import { DripPostDetailResponse } from "./DripPostDetail.types";

export const getDripPostDetail = async (
  postNo: number
): Promise<DripPostDetailResponse> => {
  try {
    console.log("Fetching drip post with postNo:", postNo);
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `http://localhost:3005/api/drip/${postNo}`,
      {
        params: { userId }
      }
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching drip post:", error);
    throw error;
  }
};

export const getDripPostLikeStatus = async (postNo: number, userId: string) => {
  try {
    console.log("Fetching like status for postNo:", postNo, "userId:", userId);
    const response = await axios.get(`http://localhost:3005/api/drip/like-status`, {
      params: { post_no: postNo, user_id: userId }
    });
    console.log("Like status API response:", response.data);
    if (response.data && typeof response.data.is_liked === 'boolean') {
      console.log("Returning like status:", response.data.is_liked);
      return response.data.is_liked;
    }
    console.error("Invalid like status response:", response.data);
    return false;
  } catch (error) {
    console.error("Error fetching like status:", error);
    return false;
  }
};

export const likeDripPostQuery = async (postNo: number, userId: string) => {
  try {
    const response = await axios.post(`http://localhost:3005/api/drip/${postNo}/like?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("게시글 좋아요 실패:", error);
    throw error;
  }
};

export const unlikeDripPostQuery = async (postNo: number, userId: string) => {
  try {
    const response = await axios.delete(`http://localhost:3005/api/drip/${postNo}/like?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("게시글 좋아요 취소 실패:", error);
    throw error;
  }
};

export const saveDripPostQuery = async (postNo: number, userId: string) => {
  try {
    const response = await axios.post(`http://localhost:3005/api/drip/${postNo}/save`, {
      userId: userId
    });
    return response.data;
  } catch (error) {
    console.error("게시글 저장 실패:", error);
    throw error;
  }
};

export const getDripPostSaveStatus = async (postNo: number, userId: string) => {
  try {
    const response = await axios.get(`http://localhost:3005/api/drip/${postNo}/save-status`, {
      params: { userId }
    });
    return response.data.saved;
  } catch (error) {
    console.error("저장 상태 확인 실패:", error);
    return false;
  }
};