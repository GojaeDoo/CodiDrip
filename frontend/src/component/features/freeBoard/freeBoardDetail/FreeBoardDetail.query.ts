import axios from "axios";

export const getFreeBoardDetailQuery = async (postId: number) => {
  const response = await axios.get(`http://localhost:3005/api/freeBoard/${postId}`);
  return response.data;
};

export const deleteFreeBoardWriteQuery = async (postId: number) => {
  const response = await axios.delete(`http://localhost:3005/api/freeBoard/${postId}`);
  return response.data;
};