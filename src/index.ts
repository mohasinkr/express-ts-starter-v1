import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './utils/databaseConnection.js';
import { fileURLToPath } from 'url';
import path from 'path';
import indexRouter from './routes/index.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', `${__dirname}/views`);

app.set('view engine', 'pug');

app.get("/", (req, res) => {
  return res.send("Yep, the server is running 🏃");
});

app.get("/login", (req, res) => {
  return res.sendFile(`${__dirname}/views/login.html`);
});

app.get("/signup", (req, res) => {
  return res.sendFile(`${__dirname}/views/signup.html`);
});

app.use('/api/v1', indexRouter);

app.get('/health-check', async (_req, res, _next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  try {
    res.send(healthcheck);
  } catch (error: any) {
    healthcheck.message = error;
    res.status(503).send();
  }
});

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});