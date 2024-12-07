import express from "express";
import type { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

export const initMiddlewares = (app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(helmet());
};
