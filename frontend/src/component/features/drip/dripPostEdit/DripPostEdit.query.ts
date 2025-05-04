import axios from "axios";
import { PostDripData } from "./DripPostEdit.types";

export const postDrip = async (data: PostDripData) => {
  try {
    const response = await axios.post("http://localhost:3005/api/drip", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Response headers:", error.response?.headers);
      console.log("Response data:", error.response?.data);
    }
    console.error("Error posting drip:", error);
    throw error;
  }
};
