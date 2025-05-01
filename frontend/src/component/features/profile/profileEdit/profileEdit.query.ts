import axios from "axios";

export interface ProfileData {
  userId: string;
  height: number;
  weight: number;
  gender: string;
  nickname: string;
  profileImage: string;
}

export const ProfileCreate = async (data: ProfileData) => {
  try {
    const response = await axios.post(
      "http://localhost:3005/api/profiles/createProfile",
      data
    );
    return response.data;
  } catch (error) {
    console.error("프로필 생성 중 오류 발생:", error);
    throw error;
  }
};

export const ProfileUpdate = async (data: ProfileData) => {
  try {
    const response = await axios.put(
      `http://localhost:3005/api/profiles/updateProfile/${data.userId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("프로필 수정 중 오류 발생:", error);
    throw error;
  }
};

export const getProfileQuery = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/profiles/${userId}`
    );
    if (response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("프로필 정보 조회 중 오류 발생:", error);
    throw error;
  }
};
