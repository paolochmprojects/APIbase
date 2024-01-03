import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.js";
import { userRegisterSchema, userLoginSchema } from "../schemas/user.js";
import { validationBody } from "../middlewares/validation.js";
import { verifyToken } from "../middlewares/authentication.js";

// router
const router = Router();
// routes

router.post("/register", validationBody(userRegisterSchema), registerUser)
router.post("/login", validationBody(userLoginSchema), loginUser)

router.get("/test", verifyToken, async (req, res) => {
    res.status(200).json({ message: req.user })
})

export default router;