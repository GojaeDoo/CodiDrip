import axios from "axios";

export const getDripUserFetchQuery = async (gender: string | undefined) => {
  try {
    const url = gender
      ? `https://codidrip-backend.onrender.com/api/profiles?gender=${gender}`
      : `https://codidrip-backend.onrender.com/api/profiles`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
