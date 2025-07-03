// src/controller/userController.ts
import { Request, Response, NextFunction } from "express";
import {
  IdCheckType,
  User,
  EmailCheckType,
  PasswordFindType,
} from "../types/userTypes";

import {
  postUserJoinService,
  getAllUsers,
  getIdOverlappingCheckService,
  getEmailOverlappingCheckService,
  getFindIdService,
  postLoginUserService,
  getFindPasswordCheckService,
  postVerifyPasswordCodeService,
  selectUserService,
  postResetPasswordService,
  checkFollowStatusService,
  toggleFollowService,
  getFollowersService,
  getFollowingService,
  checkUserAdminStatusService,
} from "../service/userService";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await getAllUsers();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "getUsers 500error - userController" });
  }
};

export const getSelectUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    if (!id) {
      res
        .status(400)
        .json({ error: "getSelectUser 400error - userController" });
      return;
    }
    const SelectUser = await selectUserService({
      user_id: id as string,
    });
    res.json(SelectUser);
  } catch (error) {
    console.error("사용자 조회 실패:", error);
    res.status(500).json({ error: "getSelectUser 500error - userController" });
  }
};

export const getIdOverlappingCheckController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user_id } = req.query;

    if (!user_id || typeof user_id !== "string") {
      res
        .status(400)
        .json({ error: "getIdOverlappingCheck 400error - userController" });
      return;
    }

    const idCheck: any = await getIdOverlappingCheckService({
      user_id: user_id as string,
    });

    const OverlappingCheck: string = idCheck.length;

    res.json({ exists: OverlappingCheck });
  } catch (error) {
    res
      .status(500)
      .json({ error: "getIdOverlappingCheck 500error - userController" });
  }
};

export const getEmailOverlappingCheckController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user_email } = req.query;

    if (!user_email || typeof user_email !== "string") {
      res
        .status(400)
        .json({ error: "getEmailOverlappingCheck 400error - userController" });
      return;
    }

    const emailCheck: any = await getEmailOverlappingCheckService({
      user_email: user_email as string,
    });

    const OverlappingCheck: string = emailCheck.length;

    res.json({ exists: OverlappingCheck });
  } catch (error) {
    res
      .status(500)
      .json({ error: "getEmailOverlappingCheck 500error - userController" });
  }
};

export const getFindIdController = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const findId = await getFindIdService({
      user_email: email as string,
    });

    res.json({ findId });
  } catch (error) {
    console.error("아이디 찾기 실패:", error);
    res.status(500).json({ error: "getFindId 500error - userController" });
  }
};

export const getFindPasswordController = async (req: Request, res: Response) => {
  try {
    const { id, email } = req.query;

    const findPassword = await getFindPasswordCheckService({
      user_id: id as string,
      user_email: email as string,
    });

    res.json({ findPassword });
  } catch (error) {
    console.error("비밀번호 찾기 실패:", error);
    res
      .status(500)
      .json({ error: "getFindPassword 500error - userController" });
  }
};

export const postUserJoinController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData: User = req.body;

    const result = await postUserJoinService(userData);
    res.json(result);
  } catch (error: any) {
    if (error.code === "23505" && error.constraint === "users_user_email_key") {
      res.status(400).json({ error: "postUserJoin 400error - userController" });
    } else {
      console.error("회원가입 실패:", error);
      res.status(500).json({ error: "postUserJoin 500error - userController" });
    }
  }
};

export const postLoginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user_id, user_password } = req.body;

    if (!user_id || !user_password) {
      res
        .status(400)
        .json({ error: "아이디와 비밀번호를 모두 입력해주세요." });
      return;
    }

    const result = await postLoginUserService(user_id, user_password);
    
    res.status(200).json({
      message: "로그인 성공",
      user: result.user,
      token: result.token,
    });
  } catch (error: any) {
    console.error("로그인 컨트롤러 에러:", error);
    res.status(401).json({ error: error.message });
  }
};

export const postVerifyPasswordCodeController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      res.status(400).json({
        error: "verifyPasswordCodeController 400error - userController",
      });
      return;
    }

    const result = await postVerifyPasswordCodeService(email, code);
    res.json(result);
  } catch (error) {
    console.error("인증번호 검증 실패:", error);
    res.status(500).json({
      error: "verifyPasswordCodeController 500error - userController",
    });
  }
};

export const postUserResetPasswordController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        error: "postUserResetPassword 400error - userController",
      });
      return;
    }

    const result = await postResetPasswordService(email, password);
    res.json(result);
  } catch (error: any) {
    console.error("비밀번호 재설정 실패:", error);
    res.status(500).json({
      error: "postUserResetPassword 500error - userController",
    });
  }
};

// 팔로우 상태 확인 컨트롤러
export const getFollowStatusController = async (req: Request, res: Response) => {
  try {
    const { followerId, followingId } = req.query;

    if (!followerId || !followingId) {
      res.status(400).json({ 
        error: "followerId와 followingId가 필요합니다." 
      });
      return;
    }

    const result = await checkFollowStatusService(
      followerId as string, 
      followingId as string
    );
    
    res.json(result);
  } catch (error) {
    console.error("팔로우 상태 확인 실패:", error);
    res.status(500).json({ 
      error: "팔로우 상태 확인 중 오류가 발생했습니다." 
    });
  }
};

// 팔로우 토글 컨트롤러
export const postToggleFollowController = async (req: Request, res: Response) => {
  try {
    const { followerId, followingId } = req.body;

    if (!followerId || !followingId) {
      res.status(400).json({ 
        error: "followerId와 followingId가 필요합니다." 
      });
      return;
    }

    const result = await toggleFollowService(followerId, followingId);
    res.json(result);
  } catch (error: any) {
    console.error("팔로우 토글 실패:", error);
    res.status(500).json({ 
      error: error.message || "팔로우 처리 중 오류가 발생했습니다." 
    });
  }
};

// 팔로워 목록 가져오기 컨트롤러
export const getFollowersController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ 
        error: "userId가 필요합니다." 
      });
      return;
    }

    const followers = await getFollowersService(userId as string);
    res.json(followers);
  } catch (error) {
    console.error("팔로워 목록 조회 실패:", error);
    res.status(500).json({ 
      error: "팔로워 목록 조회 중 오류가 발생했습니다." 
    });
  }
};

// 팔로잉 목록 가져오기 컨트롤러
export const getFollowingController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") {
      res.status(400).json({ error: "getFollowingController 400error - userController" });
      return;
    }

    const following = await getFollowingService(userId);
    res.json(following);
  } catch (error) {
    console.error("팔로잉 목록 조회 실패:", error);
    res.status(500).json({ error: "getFollowingController 500error - userController" });
  }
};

// 사용자 관리자 상태 확인 컨트롤러
export const checkUserAdminStatusController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") {
      res.status(400).json({ error: "checkUserAdminStatusController 400error - userController" });
      return;
    }

    const user = await checkUserAdminStatusService(userId);
    res.json(user);
  } catch (error) {
    console.error("사용자 관리자 상태 확인 실패:", error);
    res.status(500).json({ error: "checkUserAdminStatusController 500error - userController" });
  }
};
