import express, { json, urlencoded } from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";

import { adminRouter } from "./routes/admin.routes";
import { studentRouter } from "./routes/student.routes";

const app = express();

// Cors middleware
app.use(
  cors({
    credentials: true,
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    origin: "*",
  })
);

// Global middlewares
app.use(compression());
app.use(json({ limit: "10mb" }));
app.use(urlencoded({ extended: true, limit: "10mb" }));
// Security middlewares
app.use(helmet());
app.use(hpp());

// Cookie middleware
app.use(cookieParser());

// Routes middleware
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/students", studentRouter);

export { app };
