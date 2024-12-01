import type { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log(req);
  next();
};
