import axios from "axios";
import { DripPostDetailResponse } from "./dripPostDetail.types";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const getDripPostDetail = async (
  postNo: number
): Promise<DripPostDetailResponse> => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `${API_ENDPOINTS.DRIP}/${postNo}`,
      {
        params: { userId }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching drip post:", error);
    throw error;
  }
};

export const getDripPostLikeStatus = async (postNo: number, userId: string) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.DRIP}/like-status`, {
      params: { post_no: postNo, user_id: userId }
    });
    if (response.data && typeof response.data.is_liked === 'boolean') {
      return response.data.is_liked;
    }
    console.error("Invalid like status response:", response.data);
    return false;
  } catch (error) {
    console.error("Error fetching like status:", error);
    return false;
  }
};

export const postLikeDripPostQuery = async (postNo: number, userId: string) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.DRIP}/${postNo}/like?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("게시글 좋아요 실패:", error);
    throw error;
  }
};

export const deleteUnlikeDripPostQuery = async (postNo: number, userId: string) => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.DRIP}/${postNo}/like?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("게시글 좋아요 취소 실패:", error);
    throw error;
  }
};

export const postSaveDripPostQuery = async (postNo: number, userId: string) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.DRIP}/${postNo}/save`, {
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
    const response = await axios.get(`${API_ENDPOINTS.DRIP}/${postNo}/save-status`, {
      params: { userId }
    });
    return response.data.saved;
  } catch (error) {
    console.error("저장 상태 확인 실패:", error);
    return false;
  }
};