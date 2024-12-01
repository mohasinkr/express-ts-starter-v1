import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
import { authMiddleware } from "./middleware/auth.middleware.js";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware.js";
import { initMiddlewares } from "./middleware/index.js";
import indexRouter from "./routes/index.routes.js";
import { connectToDatabase } from "./utils/databaseConnection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const HOST = process.env.HOST || "http://localhost";
const PORT = Number.parseInt(process.env.PORT || "4500");

const app = express();

// setup the common middlewares (logging,body parser etc )
initMiddlewares(app);

app.set("views", `${__dirname}/views`);

app.set("view engine", "pug");

app.get("/", (_, res: express.Response) => {
  res.send(`Yep, the server is running🏃 on ${PORT}`);
});

app.get("/login", authMiddleware, (_, res) => {
  return res.sendFile(`${__dirname}/views/login.html`);
});

app.get("/signup", (_, res) => {
  return res.sendFile(`${__dirname}/views/signup.html`);
});

app.get("/forgot-password", (_, res) => {
  return res.sendFile(`${__dirname}/views/forgot-password.html`);
});

app.get("/gen-error", () => {
  throw Error("Unknown excpetion occured!");
});

app.use("/api/v1", indexRouter);

app.get("/health-check", (_req, res, _next) => {
  const uptimeInSeconds = process.uptime();
  const uptimeInHours = Math.floor(uptimeInSeconds / 3600);
  const uptimeInMinutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const uptimeInSecondsRemaining = Math.floor(uptimeInSeconds % 60);

  const uptime = `${uptimeInHours}h ${uptimeInMinutes}m ${uptimeInSecondsRemaining}s`;
  const healthcheck = {
    uptime,
    message: "OK",
    timestamp: new Date().toISOString(),
  };
  res.send(healthcheck);
});

app.use(errorHandlerMiddleware);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
