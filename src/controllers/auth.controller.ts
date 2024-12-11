import type { Request, Response, NextFunction } from "express";
import { loginUserService, addUserService } from "@/services/auth.service.js";
import { ERROR_MESSAGES } from "@/utils/constants.js";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const result = await loginUserService(username, password);
    res.status(result.statusCode).send(result.response);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      data: null,
    });
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const { username, password, password_confirmation } = req.body;
    const result = await addUserService(
      username,
      password,
      password_confirmation
    );
    res.status(result.statusCode).json(result.response);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      data: null,
    });
  }
};

export { loginUser, addUser };
