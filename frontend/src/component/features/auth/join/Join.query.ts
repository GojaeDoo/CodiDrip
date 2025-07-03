import axios from "axios";

export const postUserJoinQuery = async (userData: {
  user_id: string;
  user_password: string;
  user_email: string;
}) => {
  try {
    const response = await axios.post(
      "https://codidrip-backend.onrender.com/api/users",
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
      "https://codidrip-backend.onrender.com/api/users/check-id",
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
      "https://codidrip-backend.onrender.com/api/users/check-email",
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
