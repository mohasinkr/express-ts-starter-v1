import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/login", authController.loginUser);
authRouter.post("/signup", authController.addUser);
authRouter.post("/forgot-password", authController.forgotPassword);

export default authRouter;
