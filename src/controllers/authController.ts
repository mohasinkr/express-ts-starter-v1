import hashPassword from "@/utils/hashPassword.js";
import UserModel from "@/models/user.js";
import { checkAuthValidation } from "@/lib/checkValidation.js";
import { ERROR_MESSAGES } from "@/utils/constants.js";
import jwt from "jsonwebtoken";
import getJWTSecret from "@/utils/getJWTSecret.js";
import { Request, Response } from "express";

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const document = await UserModel.findOne({ username });
  const hashedPassword = hashPassword(password);

  if (document && hashedPassword) {
    if (document.password === hashedPassword) {
      const token = jwt.sign(
        { title: "Login Page", name: document.username },
        getJWTSecret(),
        { expiresIn: "24h" }
      );
      return res.status(200).json({
        success: true,
        message: "Login successfull",
        data: token,
      });
    }
  }
  return res.status(401).json({
    success: true,
    message: ERROR_MESSAGES.INVALID_CREDENTIALS,
    data: null,
  });
};

const addUser = async (req: Request, res: Response) => {
  const { password, username, password_confirmation } = req.body;

  const validation = await checkAuthValidation({
    username,
    password,
    password_confirmation,
  });

  const document = await UserModel.findOne({ username: validation.username });

  if (document) {
    return res.json({
      success: false,
      message: "User already exists",
      data: null,
    });
  }
  const hashedPassword = hashPassword(password);

  console.log(hashedPassword);

  await UserModel.create({ username, password: hashedPassword });

  const token = jwt.sign({ name: document.username }, getJWTSecret(), {
    expiresIn: "24h",
  });

  return res.status(201).json({
    success: true,
    message: "User added successfully",
    data: token,
  });
};

const forgotPassword = async (req: Request, res: Response) => {
  res.render("");
};

export { loginUser, addUser, forgotPassword };
