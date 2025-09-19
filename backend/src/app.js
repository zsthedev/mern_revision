import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { ErrorMiddleware } from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config({ path: "./src/config/config.env" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/", authRoutes);

app.use(ErrorMiddleware);
export default app;
