import {
  getFindAllProfileDB,
  getFindByIdProfileDB,
  getUserProfileByIdDB,
  getCreateProfileDB,
  updateProfile,
  getFindNickNameCheckDB
} from "../storage/profileStorage";
import { Profile } from "../types/profileTypes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProfiles = async (gender?: string): Promise<Profile[]> => {
  try {
    return await getFindAllProfileDB(gender);
  } catch (error) {
    console.error("getAllProfiles error - profileService");
    throw new Error("프로필 목록을 가져오는 중 오류가 발생했습니다.");
  }
};

export const getProfileById = async (id: string): Promise<Profile | null> => {
  try {
    return await getFindByIdProfileDB(id);
  } catch (error) {
    console.error("getProfileById error - profileService");
    throw new Error("프로필을 가져오는 중 오류가 발생했습니다.");
  }
};

export const getUserProfileById = async (
  id: string
): Promise<Profile | null> => {
  try {
    return await getUserProfileByIdDB(id);
  } catch (error) {
    console.error("getUserProfileById error - profileService");
    throw new Error("프로필을 가져오는 중 오류가 발생했습니다.");
  }
};

export const getCreateProfileService = async (
  height: number,
  weight: number,
  gender: string,
  nickname: string,
  profileImage: string | null,
  userId: string,
  profileAbout: string
): Promise<Profile | null> => {
  try {
    console.log("파라미터 확인:", {
      height,
      weight,
      gender,
      nickname,
      profileImage,
      userId,
      profileAbout,
    });
    const result = await getCreateProfileDB(
      height,
      weight,
      gender,
      nickname,
      profileImage,
      userId,
      profileAbout
    );
    console.log("결과:", result);
    return result;
  } catch (error) {
    console.error("createProfile error - profileService:", error);
    throw new Error("프로필을 생성하는 중 오류가 발생했습니다.");
  }
};

export const getUpdateProfileService = async (
  height: number,
  weight: number,
  gender: string,
  nickname: string,
  profileImage: string,
  userId: string,
  profileAbout: string
) => {
  try {
    const updatedProfile = await updateProfile(
      height,
      weight,
      gender,
      nickname,
      profileImage,
      userId,
      profileAbout
    );

    return {
      success: true,
      data: updatedProfile,
    };
  } catch (error) {
    console.error("프로필 수정 중 오류 발생:", error);
    throw error;
  }
};

export const getNicknameCheckService = async (nickname: string) => {
  try {
    return await getFindNickNameCheckDB(nickname);
  } catch (error) {
    console.error("getNicknameCheckService error - profileService");
    throw new Error("닉네임 중복확인 중 오류가 발생했습니다.");
  }
};
