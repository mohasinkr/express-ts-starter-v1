import { checkAuthValidation } from "@/lib/checkValidation.js";
import UserModel from "@/models/user.js";
import { ERROR_MESSAGES } from "@/utils/constants.js";
import getJWTSecret from "@/utils/getJWTSecret.js";
import hashPassword from "@/utils/hashPassword.js";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send({
        success: false,
        message: ERROR_MESSAGES.MISSING_CREDENTIALS,
        data: null,
      });
      return;
    }

    const document = await UserModel.findOne({ username });
    const hashedPassword = hashPassword(password);

    if (!document || document.password !== hashedPassword) {
      res.status(401).send({
        success: false,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        data: null,
      });
      return;
    }

    const token = await jwt.sign(
      { userId: document?._id, username: document?.username },
      getJWTSecret(),
      { expiresIn: "24h" }
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      data: { token },
    });
    return;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      data: null,
    });
    return;
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const { password, username, password_confirmation } = req.body;

    const validation = await checkAuthValidation({
      username,
      password,
      password_confirmation,
    });

    if (!validation) {
      res.status(400).json({
        success: false,
        message: ERROR_MESSAGES.VALIDATION_FAILED,
        data: null,
      });
      return;
    }

    const existingUser = await UserModel.findOne({
      username: validation.username,
    });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: ERROR_MESSAGES.USER_EXISTS,
        data: null,
      });
      return;
    }

    const hashedPassword = hashPassword(password);
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      getJWTSecret(),
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token },
    });
    return;
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      data: null,
    });
  }
};

// TODO: Implement forgot password functionality
const forgotPassword = async (_req: Request, _res: Response) => {
  throw new Error("Not implemented");
};

export { loginUser, addUser, forgotPassword };
