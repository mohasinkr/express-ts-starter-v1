import {
	addUser,
	forgotPassword,
	loginUser,
} from "@/controllers/authController.js";
import { authMiddleware } from "@/middleware/auth.middleware.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/signup", addUser);
authRouter.post("/forgot-password", forgotPassword);

export default authRouter;
