import {
  addUser,
  // forgotPassword,
  loginUser,
} from "@/controllers/auth.controller.js";
import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler.js";

const authRouter = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Log in a user and return an authentication token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Missing credentials
 */

authRouter.post("/login", asyncHandler(loginUser));
authRouter.post("/signup", asyncHandler(addUser));
// authRouter.post("/forgot-password", forgotPassword);

export default authRouter;
