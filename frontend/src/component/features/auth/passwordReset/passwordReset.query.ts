import axios from "axios";

export const postPasswordResetUserQuery = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `https://codidrip-backend.onrender.com/api/users/reset-password`,
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
