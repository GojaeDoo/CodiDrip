import axios from "axios";

export const getFreeBoardList = async () => {
  try {
    const response = await axios.get("https://codidrip-backend.onrender.com/api/freeBoard");
    return response.data;
  } catch (error) {
    console.error("getFreeBoardList error - freeBoardList.query:", error);
  }
};

export const getFreeBoardSearch = async (keyword: string) => {
  try {
    const response = await axios.get(`https://codidrip-backend.onrender.com/api/search/freeBoard?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  } catch (error) {
    console.error("getFreeBoardSearch error - freeBoardList.query:", error);
  }
};
