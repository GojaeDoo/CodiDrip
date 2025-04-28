import axios from "axios";
import { ProfileCreateParams } from "./ProfileEdit.types";

export const ProfileCreate = async (params: ProfileCreateParams) => {
  const response = await axios.post(
    `http://localhost:3005/api/profiles/createProfile`,
    params
  );

  return response.data;
};
