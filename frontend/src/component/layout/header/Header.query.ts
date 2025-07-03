import axios from "axios";
import { Profile } from "./Header.types";
import { getProfileImageUrl } from "@/utils/imageUtils";

export const getUserProfileQuery = async (userId: string): Promise<Profile | null> => {
  try {
    const response = await axios.get(
      `https://codidrip-backend.onrender.com/api/profiles/${userId}`
    );
    
    if (!response.data) {
      return null;
    }

    const profile = {
      ...response.data,
      profile_image: getProfileImageUrl(response.data.profile_image),
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
      `https://codidrip-backend.onrender.com/api/search/search?keyword=${keyword}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching search result:", error);
  }
};
