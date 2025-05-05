import axios from "axios";

export const getUserDripPostFetch = async (storageId: string) => {
  const response = await axios.get(
    `http://localhost:3005/api/drip/${storageId}`
  );
  return response.data;
};
