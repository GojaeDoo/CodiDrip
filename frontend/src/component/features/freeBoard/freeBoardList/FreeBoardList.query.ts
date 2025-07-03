import axios from "axios";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const getFreeBoardList = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.FREEBOARD);
    return response.data;
  } catch (error) {
    console.error("getFreeBoardList error - freeBoardList.query:", error);
  }
};

export const getFreeBoardSearch = async (keyword: string) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.SEARCH}/freeBoard?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  } catch (error) {
    console.error("getFreeBoardSearch error - freeBoardList.query:", error);
  }
};
