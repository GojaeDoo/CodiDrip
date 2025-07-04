import { Request, Response, NextFunction } from "express";
import {
  getAllProfilesService,
  getProfileService,
  getUserProfileService,
  getCreateProfileService,
  postUpdateProfileService,
  getNicknameCheckService
} from "../service/profileService";
import { StorageService } from "../service/storageService";
import { PrismaClient } from "@prisma/client";
import { supabase } from "../supabase";

const prisma = new PrismaClient();

// 모든 프로필 가져오기
export const getProfilesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const gender = req.query.gender as string;
    const profiles = await getAllProfilesService(gender);
    
    // Supabase Storage에서 실제 이미지 URL 가져오기
    if (supabase) {
      const { data: profileImages } = await supabase.storage
        .from('profiles')
        .list('', { limit: 100 });
      
      const imageMap = new Map();
      if (profileImages) {
        for (const file of profileImages) {
          const { data: urlData } = supabase.storage
            .from('profiles')
            .getPublicUrl(file.name);
          imageMap.set(file.name, urlData.publicUrl);
        }
      }
      
      // 프로필 데이터에 실제 이미지 URL 적용
      const profilesWithImages = profiles.map((profile: any) => {
        if (profile.profile_image) {
          // 파일명만 추출
          const fileName = profile.profile_image.replace(/^.*[\\\/]/, '');
          const actualUrl = imageMap.get(fileName);
          if (actualUrl) {
            return { ...profile, profile_image: actualUrl };
          }
        }
        return profile;
      });
      
      res.json(profilesWithImages);
    } else {
      res.json(profiles);
    }
  } catch (error) {
    console.error("프로필 조회 중 오류:", error);
    res.status(500).json({ error: "getProfiles 500error - profileController" });
  }
};

// 특정 프로필 가져오기
export const getProfileController = async (
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

    const profile = await getProfileService(id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "getProfile 500error - profileController" });
  }
};

export const getUserProfileController = async (
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
    const profile = await getUserProfileService(id);
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

export const postUpdateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { height, weight, gender, nickname, profileImage, profileAbout } = req.body;
    const profile = await postUpdateProfileService(
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

export const getNicknameCheckController = async (
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

// 프로필 이미지 업로드 컨트롤러
export const uploadProfileImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "이미지 파일이 필요합니다." });
    }

    console.log('📤 프로필 이미지 업로드 시작:', {
      fileSize: req.file.size,
      mimetype: req.file.mimetype,
      originalname: req.file.originalname
    });

    const fileName = `profileImage-${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;
    const result = await StorageService.uploadProfileImage(req.file.buffer, fileName);

    console.log('📤 프로필 이미지 업로드 결과:', {
      success: result.success,
      url: result.url,
      error: result.error,
      fallback: result.fallback
    });

    if (result.success && result.url) {
      res.json({ 
        success: true, 
        imageUrl: result.url,
        fileName: fileName
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error || "이미지 업로드에 실패했습니다." 
      });
    }
  } catch (error) {
    console.error("프로필 이미지 업로드 중 오류 발생:", error);
    res.status(500).json({ error: "이미지 업로드 중 오류가 발생했습니다." });
  }
};