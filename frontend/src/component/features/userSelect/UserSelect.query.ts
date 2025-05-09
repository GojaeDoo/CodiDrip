import axios from "axios";

export const UserSelectQuery = async (id: string) => {
  const response = await axios.get(
    `http://localhost:3005/api/users/select_user?id=${id}`
  );
  return response.data;
};
