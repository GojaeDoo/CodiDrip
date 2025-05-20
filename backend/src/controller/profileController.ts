import { Request, Response, NextFunction } from "express";
import {
  getAllProfiles,
  getProfileById,
  getUserProfileById,
  getCreateProfileService,
  getUpdateProfileService,
} from "../service/profileService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 모든 프로필 가져오기
export const getProfiles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const gender = req.query.gender as string;
    const profiles = await getAllProfiles(gender);
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "getProfiles 500error - profileController" });
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
      res
        .status(400)
        .json({ error: "getProfile 400error - profileController" });
      return;
    }

    const profile = await getProfileById(id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "getProfile 500error - profileController" });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      res
        .status(400)
        .json({ error: "getUserProfile 400error - profileController" });
      return;
    }
    const profile = await getUserProfileById(id);
    res.json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ error: "getUserProfile 500error - profileController" });
  }
};

export const getCreateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, height, weight, gender, nickname, profileImage } = req.body;
    console.log("프로필 생성 요청 데이터:", {
      userId,
      height,
      weight,
      gender,
      nickname,
      profileImage,
    });

    if (!profileImage) {
      return res.status(400).json({ error: "프로필 이미지가 필요합니다." });
    }

    const profile = await getCreateProfileService(
      height,
      weight,
      gender,
      nickname,
      profileImage,
      userId
    );
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

export const getUpdateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { height, weight, gender, nickname, profileImage } = req.body;
    console.log("프로필 수정 요청 데이터:", {
      userId,
      height,
      weight,
      gender,
      nickname,
      profileImage,
    });

    const profile = await getUpdateProfileService(
      height,
      weight,
      gender,
      nickname,
      profileImage,
      userId
    );
    res.status(200).json(profile);
  } catch (error) {
    console.error("프로필 수정 중 오류 발생:", error);
    next(error);
  }
};
