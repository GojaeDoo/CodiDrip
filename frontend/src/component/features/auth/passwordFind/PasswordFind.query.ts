import axios from "axios";

export const getPasswordFindUserQuery = async (id: string, email: string) => {
  const response = await axios.get(
    `http://localhost:3005/api/users/find-password?id=${id}&email=${email}`
  );
  return response.data;
};
