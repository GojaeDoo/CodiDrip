import axios from "axios";

export const getIdFindUserQuery = async (email: string) => {
  try {
    const response = await axios.get(
      `https://codidrip-backend.onrender.com/api/users/find-id?email=${encodeURIComponent(email)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
