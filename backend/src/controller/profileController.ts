import { Request, Response } from "express";
import { getAllProfiles, getProfileById } from "../service/profileService";

// 모든 프로필 가져오기
export const getProfiles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profiles = await getAllProfiles();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "프로필 찾는거 컨트롤러 에러" });
  }
};

// 특정 프로필 가져오기
export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      res.status(400).json({ error: "유효하지 않은 profile_id" });
      return;
    }

    const profile = await getProfileById(id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "프로필 찾는거 컨트롤러 에러" });
  }
};
