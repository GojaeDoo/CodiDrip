import axios from "axios";
import { ProfileData } from "./ProfileEdit.types";


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

export const getNicknameCheck = async (nickname: string, userId?: string) => {
  console.log("=== getNicknameCheck 함수 시작 ===");
  console.log("요청할 닉네임:", nickname);
  console.log("현재 사용자 ID:", userId);
  
  const url = userId 
    ? `http://localhost:3005/api/profiles/nicknameCheck/${nickname}?userId=${userId}`
    : `http://localhost:3005/api/profiles/nicknameCheck/${nickname}`;
  
  console.log("요청 URL:", url);
  
  try {
    console.log("axios.get 호출 직전");
    const response = await axios.get(url);
    console.log("axios.get 호출 완료");
    console.log("응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("=== getNicknameCheck 함수 오류 ===");
    console.error("닉네임 중복확인 중 오류 발생:", error);
    console.error("오류 타입:", typeof error);
    console.error("오류 메시지:", error instanceof Error ? error.message : String(error));
    if (axios.isAxiosError(error)) {
      console.error("HTTP 상태 코드:", error.response?.status);
      console.error("응답 데이터:", error.response?.data);
    }
    throw error;
  }
}