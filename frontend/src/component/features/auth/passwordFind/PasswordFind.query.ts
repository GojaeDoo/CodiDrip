import axios from "axios";

export const getPasswordFindUserQuery = async (id: string, email: string) => {
  const response = await axios.get(
    `https://codidrip-backend.onrender.com/api/users/find-password?id=${id}&email=${email}`
  );
  return response.data;
};
