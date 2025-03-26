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
    console.error("❌ 회원가입 요청 실패:", error);
    throw error;
  }
};

export const overlappingCheck = async (id: string) => {
  try {
    const response = await axios.get(
      "http://localhost:3002/api/users/check-id",
      {
        params: { user_id: id }, // 쿼리 파라미터로 user_id 전달
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("아이디 중복 찾기 실행 실패", error);
  }
};
