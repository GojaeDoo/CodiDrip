import axios from "axios";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const getIdFindUserQuery = async (email: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.FIND_ID}?email=${encodeURIComponent(email)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
