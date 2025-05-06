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
