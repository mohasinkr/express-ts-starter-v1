import {
  addUser,
  // forgotPassword,
  loginUser,
} from "@/controllers/auth.controller.js";
import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { loginSchema } from "@/validators/login.schema.js";
import { validateRequest } from "@/middleware/validation.middleware.js";
import { signupSchema } from "@/validators/signup.schema.js";

const authRouter = Router();

authRouter.post("/login", validateRequest(loginSchema), asyncHandler(loginUser));
authRouter.post("/signup", validateRequest(signupSchema), asyncHandler(addUser));
// authRouter.post("/forgot-password", forgotPassword);

export default authRouter;
