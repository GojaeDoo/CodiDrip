import { Request, Response } from "express";
import { dripService } from "../service/dripService";

export const createDrip = async (req: Request, res: Response) => {
  try {
    const { images, tags, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const result = await dripService.createDrip(images, tags, userId);
    res.status(201).json(result);
  } catch (error) {
    console.error("createDrip error - dripController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserDrip = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const gender = req.query.gender as string;
    const drips = await dripService.getUserDrip(userId, gender);
    res.status(200).json(drips);
  } catch (error) {
    console.error("getUserDrip error - dripController:", error);
    res.status(500).json({ error: "getUserDrip 500error - dripController" });
  }
};

export const getPostNoDrip = async (req: Request, res: Response) => {
  try {
    const postNo = parseInt(req.params.postNo, 10);
    if (isNaN(postNo)) {
      return res
        .status(400)
        .json({ error: "유효하지 않은 게시물 번호입니다." });
    }
    const drip = await dripService.getPostNoDrip(postNo);
    res.status(200).json(drip);
  } catch (error) {
    console.error("getPostNoDrip error - dripController:", error);
    res.status(500).json({ error: "getPostNoDrip 500error - dripController" });
  }
};

export const updateDrip = async (req: Request, res: Response) => {
  try {
    const postNo = req.params.postNo;
    const { images, tags, userId } = req.body;

    if (!postNo || !images || !tags || !userId) {
      return res.status(400).json({ error: "필수 정보가 누락되었습니다." });
    }

    const updatedDrip = await dripService.updateDrip(
      postNo,
      images,
      tags,
      userId
    );
    res.status(200).json(updatedDrip);
  } catch (error) {
    console.error("updateDrip error - dripController:", error);
    res.status(500).json({ error: "게시물 수정 중 오류가 발생했습니다." });
  }
};

export const deleteDrip = async (req: Request, res: Response) => {
  try {
    const postNo = req.params.postNo;
    const result = await dripService.deleteDrip(postNo);
    res.status(200).json(result);
  } catch (error) {
    console.error("deleteDrip error - dripController:", error);
    res.status(500).json({ error: "게시물 삭제 중 오류가 발생했습니다." });
  }
};

export const getDripPostCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const postNo = parseInt(req.params.postNo, 10);
    if (isNaN(postNo)) {
      return res
        .status(400)
        .json({ error: "유효하지 않은 게시물 번호입니다." });
    }
    const dripPostComment = await dripService.getDripPostCommentService(postNo);
    res.json(dripPostComment);
  } catch (error) {
    console.error("getDripPostCommentController - error:", error);
    res.status(500).json({ error: "댓글을 불러오는데 실패했습니다." });
  }
};

export const postDripPostCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, content } = req.body;
    const { postNo } = req.params;

    console.log("Request params:", req.params);
    console.log("Request body:", req.body);
    console.log("PostNo from params:", postNo);

    const result = await dripService.postDripPostCommentService(
      userId,
      content,
      postNo
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("postDripPostCommentController - error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
