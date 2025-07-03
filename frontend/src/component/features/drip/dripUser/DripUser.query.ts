import axios from "axios";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const getDripUserFetchQuery = async (gender: string | undefined) => {
  try {
    const url = gender
      ? `${API_ENDPOINTS.PROFILES}?gender=${gender}`
      : API_ENDPOINTS.PROFILES;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
