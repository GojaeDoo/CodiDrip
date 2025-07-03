import axios from "axios";
import { PostDripData } from "./DripPostEdit.types";

export const postDripQuery = async (data: PostDripData) => {
  try {
    const response = await axios.post("https://codidrip-backend.onrender.com/api/drip", data, {
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
      `https://codidrip-backend.onrender.com/api/drip/${data.postNo}`,
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
  const response = await axios.get(`https://codidrip-backend.onrender.com/api/drip/${postNo}`);
  return response.data;
};
