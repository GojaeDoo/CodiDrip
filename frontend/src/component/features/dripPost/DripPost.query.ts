import { Profile } from "./DripPost.types";

interface ApiResponse {
  success: boolean;
  profile?: Profile;
  error?: string;
}

export const fetchProfile = async (id: string): Promise<Profile> => {
  try {
    const response = await fetch(`http://localhost:3002/api/profile/${id}`);
    const data: ApiResponse = await response.json();

    if (!data.success || !data.profile) {
      throw new Error(data.error || "프로필을 불러오는데 실패했습니다.");
    }

    return data.profile;
  } catch (error) {
    throw error;
  }
};
