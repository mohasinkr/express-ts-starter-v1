import { Router } from "express";
import {
  loginUser,
  forgotPassword,
  addUser,
} from "@/controllers/authController.js";

const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/signup", addUser);
authRouter.post("/forgot-password", forgotPassword);

export default authRouter;
