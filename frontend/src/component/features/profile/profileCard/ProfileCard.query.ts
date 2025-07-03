import axios from "axios";
import { Profile } from "@/types/profile";
import { API_ENDPOINTS, API_BASE_URL } from "@/utils/apiConfig";

export const getProfilesQuery = async (): Promise<Profile[]> => {
  try {
    const response = await axios.get(API_ENDPOINTS.PROFILES);
    const profiles = response.data.map((profile: {
      id: number;
      nickname: string;
      height: number;
      weight: number;
      profile_image: string | null;
      gender: string;
      user_id: string;
      profile_about: string | null;
    }) => ({
      profile_id: profile.id,
      profile_nickname: profile.nickname,
      profile_height: profile.height,
      profile_weight: profile.weight,
      profile_image: profile.profile_image
        ? `${API_BASE_URL}/uploads/profiles/${profile.profile_image.replace(/^\\|\//, '')}`
        : "",
      profile_gender: profile.gender,
      profile_follow: 0, // 기본값 설정
      user_id: profile.user_id,
      profile_about: profile.profile_about || "",
    }));
    return profiles;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};
