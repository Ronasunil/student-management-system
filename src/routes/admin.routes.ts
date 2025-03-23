import { Router } from "express";
import {
  adminLogin,
  assignTask,
  createStudent,
} from "../controller/admin.controller";
import {
  accessOnly,
  isAuthenticated,
  validateSchema,
  verifyUserExitence,
} from "../utils/middlewares";
import { loginSchema } from "../schema/auth.schema";
import { studentCreationSchema } from "../schema/student.schema";
import { taskAssignSchema } from "../schema/task.schema";

const adminRouter = Router();

adminRouter.post("/login", validateSchema(loginSchema), adminLogin);
adminRouter.post(
  "/user",
  validateSchema(studentCreationSchema),
  isAuthenticated,
  verifyUserExitence,
  accessOnly("Admin"),
  createStudent
);
adminRouter.post(
  "/tasks/assign",
  validateSchema(taskAssignSchema),
  isAuthenticated,
  verifyUserExitence,
  accessOnly("Admin"),
  assignTask
);

export { adminRouter };
