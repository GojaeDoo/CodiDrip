import axios from "axios";
import { LoginResponse, LoginError } from "./Login.types";

export const loginUser = async (
  userId: string,
  userPassword: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      "http://localhost:3005/api/users/login",
      {
        user_id: userId,
        user_password: userPassword,
      }
    );
    return response.data;
  } catch (error) {
    const loginError = error as LoginError;
    throw new Error(loginError.response?.data?.error || loginError.message);
  }
};

function isAxiosError404(error: unknown): error is { response: { status: number } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object" &&
    (error as { response?: unknown }).response !== null &&
    "status" in (error as { response: { status?: unknown } }).response &&
    (error as { response: { status?: unknown } }).response.status === 404
  );
}

export const profileCheck = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/profiles/user/${id}`
    );
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError404(error)) {
      // 프로필이 없는 경우
      return null;
    }
    throw error; // 그 외 에러는 그대로 throw
  }
};
