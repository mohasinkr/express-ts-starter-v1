import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

const logger = (req, res, next) => {
    console.log("entering the post controller");
    next();
}
authRouter.post("/login", logger, authController.loginUser);
authRouter.post("/signup", authController.addUser);
authRouter.post("/forgot-password", authController.forgotPassword);


export default authRouter;