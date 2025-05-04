import express, { RequestHandler } from "express";
import { createDrip } from "../controller/drip.controller";

const router = express.Router();

router.post("/", createDrip as RequestHandler);

export default router;
