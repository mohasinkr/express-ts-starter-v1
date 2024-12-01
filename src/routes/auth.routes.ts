import {
	addUser,
	forgotPassword,
	loginUser,
} from "@/controllers/authController.js";
import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler.js";

const authRouter = Router();

authRouter.post("/login", asyncHandler(loginUser));
authRouter.post("/signup", asyncHandler(addUser));
authRouter.post("/forgot-password", forgotPassword);

export default authRouter;
