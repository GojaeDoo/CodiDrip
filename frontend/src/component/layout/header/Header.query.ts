import axios from "axios";
import { Profile } from "@/types/profile";

export const fetchUserProfile = async (userId: string): Promise<Profile> => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/profiles/${userId}`
    );
    const profile = {
      ...response.data,
      profile_image: response.data.profile_image
        ? `http://localhost:3005/uploads/profiles/${response.data.profile_image}`
        : null,
    };
    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
