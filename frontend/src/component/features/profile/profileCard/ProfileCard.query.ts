import axios from "axios";
import { Profile } from "@/types/profile";

export const getProfilesQuery = async (): Promise<Profile[]> => {
  try {
    const response = await axios.get("https://codidrip-backend.onrender.com/api/profiles");
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
        ? `https://codidrip-backend.onrender.com/uploads/profiles/${profile.profile_image}`
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
