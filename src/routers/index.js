import { Router } from "express";
import userRouter from "./user.js";

const router = Router();

// routes 
router.use("/user", userRouter);

export default router;