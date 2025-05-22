import axios from "axios";
import { DripPostDetailResponse } from "./DripPostDetail.types";

export const getDripPostDetail = async (
  postNo: number
): Promise<DripPostDetailResponse> => {
  try {
    console.log("Fetching drip post with postNo:", postNo);
    const response = await axios.get(
      `http://localhost:3005/api/drip/${postNo}`
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching drip post:", error);
    throw error;
  }
};
