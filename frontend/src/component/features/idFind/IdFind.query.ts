import axios from "axios";

const API_BASE_URL = "http://localhost:3005";

export const IdFindUser = async (email: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/users/find-id?email=${encodeURIComponent(email)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
