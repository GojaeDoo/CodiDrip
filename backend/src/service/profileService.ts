import {
  getAllProfileStorage,
  getProfileStorage,
  getUserProfileStorage,
  getCreateProfileStorage,
  postUpdateProfileStorage,
  getFindNickNameCheckStorage
} from "../storage/profileStorage";
import { Profile } from "../types/profileTypes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProfilesService = async (gender?: string): Promise<Profile[]> => {
  try {
    return await getAllProfileStorage(gender);
  } catch (error) {
    console.error("getAllProfiles error - profileService");
    throw new Error("프로필 목록을 가져오는 중 오류가 발생했습니다.");
  }
};

export const getProfileService = async (id: string): Promise<Profile | null> => {
  try {
    return await getProfileStorage(id);
  } catch (error) {
    console.error("getProfileById error - profileService");
    throw new Error("프로필을 가져오는 중 오류가 발생했습니다.");
  }
};

export const getUserProfileService = async (
  id: string
): Promise<Profile | null> => {
  try {
    return await getUserProfileStorage(id);
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
    const result = await getCreateProfileStorage(
      height,
      weight,
      gender,
      nickname,
      profileImage,
      userId,
      profileAbout
    );
    return result;
  } catch (error) {
    console.error("createProfile error - profileService:", error);
    throw new Error("프로필을 생성하는 중 오류가 발생했습니다.");
  }
};

export const postUpdateProfileService = async (
  height: number,
  weight: number,
  gender: string,
  nickname: string,
  profileImage: string,
  userId: string,
  profileAbout: string
) => {
  try {
    const updatedProfile = await postUpdateProfileStorage(
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
    return await getFindNickNameCheckStorage(nickname);
  } catch (error) {
    console.error("getNicknameCheckService error - profileService");
    throw new Error("닉네임 중복확인 중 오류가 발생했습니다.");
  }
};
