import axios from "axios";
import { ProfileData } from "./ProfileEdit.types";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const postProfileCreateQuery = async (data: ProfileData) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.PROFILE_CREATE,
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
      `${API_ENDPOINTS.PROFILES}/updateProfile/${data.userId}`,
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
      `${API_ENDPOINTS.PROFILES}/${userId}`
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
    ? `${API_ENDPOINTS.PROFILES}/nicknameCheck/${nickname}?userId=${userId}`
    : `${API_ENDPOINTS.PROFILES}/nicknameCheck/${nickname}`;
  
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
      API_ENDPOINTS.PROFILE_UPLOAD,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Supabase Storage URL 반환
    if (response.data.success && response.data.imageUrl) {
      return {
        success: true,
        imageUrl: response.data.imageUrl,
        fileName: response.data.fileName
      };
    } else {
      throw new Error(response.data.error || "이미지 업로드에 실패했습니다.");
    }
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생:", error);
    throw error;
  }
};