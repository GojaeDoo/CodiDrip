import axios from "axios";

export const userJoin = async (userData: {
  user_id: string;
  user_password: string;
  user_email: string;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:3002/api/users",
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

export const idOverlappingCheck = async (id: string) => {
  try {
    const response = await axios.get(
      "http://localhost:3002/api/users/check-id",
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

export const emailOverlappingCheck = async (email: string) => {
  try {
    const response = await axios.get(
      "http://localhost:3002/api/users/check-email",
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
