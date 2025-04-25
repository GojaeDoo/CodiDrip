import axios from "axios";

export const verifyPasswordCode = async (code: string, email: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3005/api/users/verify-password-code",
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
