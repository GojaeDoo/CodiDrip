import axios from "axios";

export const getFreeBoardList = async () => {
  const response = await axios.get("http://localhost:3005/api/freeBoard");
  return response.data;
};

export const getFreeBoardSearch = async (keyword: string) => {
  const response = await axios.get(`http://localhost:3005/api/search/freeBoard?keyword=${encodeURIComponent(keyword)}`);
  return response.data;
};
