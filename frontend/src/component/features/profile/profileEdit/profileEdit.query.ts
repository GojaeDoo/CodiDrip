import axios from "axios";
import { ProfileData } from "./ProfileEdit.types";


export const postProfileCreateQuery = async (data: ProfileData) => {
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

export const putProfileUpdateQuery = async (data: ProfileData) => {
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

export const getNicknameCheckQuery = async (nickname: string, userId?: string) => {
  const url = userId 
    ? `http://localhost:3005/api/profiles/nicknameCheck/${nickname}?userId=${userId}`
    : `http://localhost:3005/api/profiles/nicknameCheck/${nickname}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const postUploadProfileImageQuery = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("profileImage", file);

    const response = await axios.post(
      "http://localhost:3005/api/profiles/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생:", error);
    throw error;
  }
};