import { Request, Response } from "express";
import { dripService } from "../service/dripService";

export const createDrip = async (req: Request, res: Response) => {
  try {
    console.log("Request body:", req.body);
    const { images, tags, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const drip = await dripService.createDrip(images, tags, userId);
    res.status(201).json(drip);
  } catch (error) {
    res.status(500).json({ error: "createDrip 500error - dripController" });
  }
};

export const getUserDrip = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string | undefined;
    const drips = await dripService.getUserDrip(userId);
    res.status(200).json(drips);
  } catch (error) {
    console.error("getUserDrip error - dripController:", error);
    res.status(500).json({ error: "getUserDrip 500error - dripController" });
  }
};

export const getPostNoDrip = async (req: Request, res: Response) => {
  try {
    const postNo = req.params.postNo;
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
