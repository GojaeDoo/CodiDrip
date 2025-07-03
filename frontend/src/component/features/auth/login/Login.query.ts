import axios from "axios";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const postLoginUserQuery = async (
  userId: string,
  userPassword: string
) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.LOGIN,
      {
        user_id: userId,
        user_password: userPassword,
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : error as string);
  }
};

export const getProfileCheckQuery = async (id: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.PROFILES}/user/${id}`
    );
    return response.data;
  } catch (error: unknown) {
    // axios 에러 객체에서 status 확인
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

// 사용자 관리자 상태 확인 API
export const checkUserAdminStatus = async (userId: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.ADMIN_STATUS}?userId=${userId}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("관리자 상태 확인 실패:", error);
    throw error;
  }
};
