import {
  getFindAllProfileDB,
  getFindByIdProfileDB,
  getUserProfileByIdDB,
} from "../storage/profileStorage";
import { Profile } from "../types/profileTypes";

export const getAllProfiles = async (): Promise<Profile[]> => {
  try {
    return await getFindAllProfileDB();
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
