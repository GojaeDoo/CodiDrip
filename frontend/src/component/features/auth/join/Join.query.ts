import axios from "axios";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const postUserJoinQuery = async (userData: {
  user_id: string;
  user_password: string;
  user_email: string;
}) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.JOIN,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("회원가입 요청 실패:", error);
    throw error;
  }
};

export const getIdOverlappingCheckQuery = async (id: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.JOIN}/check-id`,
      {
        params: { user_id: id },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("아이디 중복 찾기 실행 실패", error);
    throw error;
  }
};

export const getEmailOverlappingCheckQuery = async (email: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.JOIN}/check-email`,
      {
        params: { user_email: email },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("이메일 중복 찾기 실행 실패", error);
    throw error;
  }
};
