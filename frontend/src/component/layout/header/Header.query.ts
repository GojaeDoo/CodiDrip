import axios from "axios";
import { Profile } from "./Header.types";

export const getUserProfileQuery = async (userId: string): Promise<Profile | null> => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/profiles/${userId}`
    );
    
    if (!response.data) {
      return null;
    }

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

export const getSearchResultQuery = async (keyword: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/search/search?keyword=${keyword}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching search result:", error);
  }
};
