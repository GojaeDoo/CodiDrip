import axios from "axios";

export const getIdFindUserQuery = async (email: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/users/find-id?email=${encodeURIComponent(email)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
