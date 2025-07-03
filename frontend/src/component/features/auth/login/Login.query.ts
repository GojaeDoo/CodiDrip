import axios from "axios";

export const postLoginUserQuery = async (
  userId: string,
  userPassword: string
) => {
  try {
    const response = await axios.post(
      "https://codidrip-backend.onrender.com/api/users/login",
      {
        user_id: userId,
        user_password: userPassword,
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : error as string);
  }
};

export const getProfileCheckQuery = async (id: string) => {
  try {
    const response = await axios.get(
      `https://codidrip-backend.onrender.com/api/profiles/user/${id}`
    );
    return response.data;
  } catch (error: unknown) {
    // axios 에러 객체에서 status 확인
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log("프로필이 존재하지 않습니다. 프로필 생성 페이지로 이동합니다.");
      return null;
    }
    throw error;
  }
};

// 사용자 관리자 상태 확인 API
export const checkUserAdminStatus = async (userId: string) => {
  try {
    const response = await axios.get(
      `https://codidrip-backend.onrender.com/api/users/admin-status?userId=${userId}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("관리자 상태 확인 실패:", error);
    throw error;
  }
};
