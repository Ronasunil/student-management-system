import { Router } from "express";
import {
  isAuthenticated,
  validateSchema,
  verifyUserExitence,
} from "../utils/middlewares";
import { loginSchema } from "../schema/auth.schema";
import {
  getTasks,
  getTaskStatus,
  markAsCompleted,
  studentLogin,
} from "../controller/student.controller";

const studentRouter = Router();

studentRouter.post("/login", validateSchema(loginSchema), studentLogin);
studentRouter.get(
  "/task/:studentId",
  isAuthenticated,
  verifyUserExitence,
  getTasks
);
studentRouter.get(
  "/task/status/:studentId",
  isAuthenticated,
  verifyUserExitence,
  getTaskStatus
);

studentRouter.patch(
  "/task/:taskId/complete",
  isAuthenticated,
  verifyUserExitence,
  markAsCompleted
);

export { studentRouter };
