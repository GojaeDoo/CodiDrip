import axios from "axios";

export const getFollowersQuery = async (userId: string) => {
  try {
    const response = await axios.get(
      `https://codidrip-backend.onrender.com/api/users/followers?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("getFollowersQuery error : ", error);
    return [];
  }
};

export const getFollowingQuery = async (userId: string) => {
  try {
    const response = await axios.get(
      `https://codidrip-backend.onrender.com/api/users/following?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("getFollowingQuery error : ", error);
    return [];
  }
};
