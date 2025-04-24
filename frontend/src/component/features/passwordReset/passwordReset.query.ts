import axios from "axios";

export const PasswordResetUser = async (email: string, password: string) => {
  try {
    console.log("요청 데이터:", { email, password });
    const response = await axios.post(
      `http://localhost:3005/api/users/reset-password`,
      {
        email,
        password,
      }
    );
    console.log("응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};
