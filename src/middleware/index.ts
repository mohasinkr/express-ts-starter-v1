import express from "express";
import type { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { corsOptions } from "@/config/corsOptions.js";

export const initMiddlewares = (app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(morgan("dev"));
  app.use(helmet());
};
