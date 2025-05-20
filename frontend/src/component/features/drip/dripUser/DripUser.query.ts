import axios from "axios";

export const getDripUserFetchQuery = async (gender: string | undefined) => {
  try {
    const url = gender
      ? `http://localhost:3005/api/profiles?gender=${gender}`
      : `http://localhost:3005/api/profiles`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
