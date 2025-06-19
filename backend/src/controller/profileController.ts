import { Request, Response, NextFunction } from "express";
import {
  getAllProfiles,
  getProfileById,
  getUserProfileById,
  getCreateProfileService,
  getUpdateProfileService,
  getNicknameCheckService
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
    if (!profile) {
      res.status(404).json({ error: "프로필을 찾을 수 없습니다." });
      return;
    }
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
    const { userId, height, weight, gender, nickname, profileImage, profileAbout } = req.body;
    console.log("프로필 생성 요청 데이터:", {
      userId,
      height,
      weight,
      gender,
      nickname,
      profileImage,
      profileAbout,
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
      userId,
      profileAbout
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
    const { height, weight, gender, nickname, profileImage, profileAbout } = req.body;
    console.log("프로필 수정 요청 데이터:", {
      userId,
      height,
      weight,
      gender,
      nickname,
      profileImage,
      profileAbout,
    });

    const profile = await getUpdateProfileService(
      height,
      weight,
      gender,
      nickname,
      profileImage,
      userId,
      profileAbout
    );
    res.status(200).json(profile);
  } catch (error) {
    console.error("프로필 수정 중 오류 발생:", error);
    next(error);
  }
};

export const getNicknameCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nickname } = req.params;
    const { userId } = req.query; // 현재 사용자 ID를 쿼리 파라미터로 받음
    const profile = await getNicknameCheckService(nickname);
    
    // 프로필이 존재하지만 현재 사용자의 것이라면 사용 가능
    let isAvailable = !profile;
    
    if (profile && userId && profile.user_id === userId) {
      isAvailable = true;
      console.log("현재 사용자의 닉네임이므로 사용 가능");
    }
    
    res.json({ 
      isAvailable,
      message: isAvailable ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다."
    });
  } catch (error) {
    console.error("닉네임 중복확인 중 오류 발생:", error);
    res.status(500).json({ error: "닉네임 중복확인 중 오류 발생" });
  } 
}