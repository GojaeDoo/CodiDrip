import { findAllProfileDB, findByIdProfileDB } from "../storage/profileStorage";
import { Profile } from "../types/profile";

export const getAllProfiles = async (): Promise<Profile[]> => {
  try {
    return await findAllProfileDB();
  } catch (error) {
    console.error("프로필 service findAllProfileDB:", error);
    throw new Error("프로필 목록을 가져오는 중 오류가 발생했습니다.");
  }
};

export const getProfileById = async (id: string): Promise<Profile | null> => {
  try {
    return await findByIdProfileDB(id);
  } catch (error) {
    console.error("프로필 service findByIdProfileDB:", error);
    throw new Error("프로필을 가져오는 중 오류가 발생했습니다.");
  }
};
