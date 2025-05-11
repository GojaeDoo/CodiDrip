import axios from "axios";

export const fetchDripPostQuery = async (postNo: string | null) => {
  const response = await axios.get(`http://localhost:3005/api/drip/${postNo}`);
  return response.data;
};
