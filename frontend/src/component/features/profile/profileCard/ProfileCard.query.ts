import axios from "axios";
import { Profile } from "@/types/profile";

export const fetchProfiles = async (): Promise<Profile[]> => {
  try {
    const response = await axios.get("http://localhost:3005/api/profiles");
    const profiles = response.data.map((profile: Profile) => ({
      ...profile,
      profile_image: profile.profile_image
        ? `http://localhost:3005/uploads/profiles/${profile.profile_image}`
        : null,
    }));
    return profiles;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};
