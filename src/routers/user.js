import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.js";
import { userRegisterSchema, userLoginSchema } from "../schemas/user.js";
import { validationBody } from "../middlewares/validation.js";

// router
const router = Router();
// routes

router.post("/register", validationBody(userRegisterSchema), registerUser)
router.post("/login", validationBody(userLoginSchema), loginUser)

export default router;