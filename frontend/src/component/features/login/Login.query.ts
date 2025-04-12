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
