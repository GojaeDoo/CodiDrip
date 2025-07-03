import axios from "axios";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const postVerifyPasswordCodeQuery = async (code: string, email: string) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.JOIN}/verify-password-code`,
      {
        code,
        email,
      }
    );
    return response.data;
  } catch (error) {
    console.error("인증번호 검증 실패:", error);
    throw error;
  }
};
