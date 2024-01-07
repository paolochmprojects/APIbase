import { Router } from "express";
import userRouter from "./user.js";
import fileRouter from "./file.js";

const router = Router();

// routes 
router.use("/user", userRouter);
router.use("/file", fileRouter);

export default router;