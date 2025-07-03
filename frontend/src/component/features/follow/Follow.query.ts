import axios from "axios";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const getFollowersQuery = async (userId: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.JOIN}/followers?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("getFollowersQuery error : ", error);
    return [];
  }
};

export const getFollowingQuery = async (userId: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.JOIN}/following?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("getFollowingQuery error : ", error);
    return [];
  }
};
