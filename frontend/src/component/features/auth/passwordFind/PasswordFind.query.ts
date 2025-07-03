import axios from "axios";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const getPasswordFindUserQuery = async (id: string, email: string) => {
  const response = await axios.get(
    `${API_ENDPOINTS.FIND_PASSWORD}?id=${id}&email=${email}`
  );
  return response.data;
};
