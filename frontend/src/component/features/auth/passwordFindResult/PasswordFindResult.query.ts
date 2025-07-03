import axios from "axios";

export const postVerifyPasswordCodeQuery = async (code: string, email: string) => {
  try {
    const response = await axios.post(
      "https://codidrip-backend.onrender.com/api/users/verify-password-code",
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
