import axios from "axios";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const postPasswordResetUserQuery = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.RESET_PASSWORD,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("비밀번호 재설정 실패:", error);
  }
};
