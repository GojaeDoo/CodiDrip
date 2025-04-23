import axios from "axios";

export const FindUserEmail = async (id: string) => {
  const response = await axios.get(
    `http://localhost:3005/api/users/select_user`,
    {
      params: {
        id,
      },
    }
  );
  return response.data;
};
