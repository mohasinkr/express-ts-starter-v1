import express from "express";
import type { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";

export const initMiddlewares = (app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(helmet());
};
