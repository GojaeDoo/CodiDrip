import axios from "axios";

export const IdFindUser = async (email: string) => {
  const response = await axios.get("http://localhost:3005/api/users/find_id", {
    params: { email },
  });
  return response.data;
};
