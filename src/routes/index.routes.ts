import { Router } from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";

const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/user", userRouter);

export default indexRouter;
