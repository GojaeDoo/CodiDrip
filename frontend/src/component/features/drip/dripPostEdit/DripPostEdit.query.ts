import axios from "axios";
import { PostDripData } from "./DripPostEdit.types";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const postDripQuery = async (data: PostDripData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.DRIP, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
    }
    console.error("Error posting drip:", error);
    throw error;
  }
};

export const putUpdateDripQuery = async (
  data: PostDripData & { postNo: string | null }
) => {
  try {
    const response = await axios.put(
      `${API_ENDPOINTS.DRIP}/${data.postNo}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating drip:", error);
    throw error;
  }
};

export const getDripPostQuery = async (postNo: string) => {
  if (!postNo) {
    throw new Error("Post number is required");
  }
  const response = await axios.get(`${API_ENDPOINTS.DRIP}/${postNo}`);
  return response.data;
};
