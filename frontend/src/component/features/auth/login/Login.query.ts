import axios from "axios";

export const postLoginUserQuery = async (
  userId: string,
  userPassword: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:3005/api/users/login",
      {
        user_id: userId,
        user_password: userPassword,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getProfileCheckQuery = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/profiles/user/${id}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

// 사용자 관리자 상태 확인 API
export const checkUserAdminStatus = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/users/admin-status?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("관리자 상태 확인 실패:", error);
    throw error;
  }
};
