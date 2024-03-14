import { Router } from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import webhookRouter from "./webhook.routes.js";

const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/user', userRouter);
indexRouter.use("/storyblok-hook", webhookRouter);

export default indexRouter;