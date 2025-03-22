import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { AdminLoginParams } from "../interfaces/admin.interface";
import { AdminModel } from "../models/admin.model";
import { NotAuthorized } from "../error/NotAuthorized";

import { StudentModel } from "../models/student.model";
import { BadRequest } from "../error/BadRequest";
import { StudentCreationParams } from "../interfaces/student.interface";
import { TaskCreationParams } from "../interfaces/task.interface";
import { TaskModel } from "../models/task.model";
import { helper } from "../utils/Helper";

const login = async function (req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as AdminLoginParams;

  //   Check admin exist
  const admin = await AdminModel.findOne({ email });
  if (!admin)
    throw new NotAuthorized("Email or password is incorrect", "login");
  // Check password is same
  const isPasswordSame = await admin.comparePassword(password);
  if (!isPasswordSame)
    throw new NotAuthorized("Email or password is incorrect", "login admin");

  // Signing token
  const token = helper.signToken({
    _id: admin.id.toString(),
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  // Setting cookie
  helper.setCookie(res, token);

  res.status(httpStatus.OK).json({ message: "Login successfull", admin });
};

export const createStudent = async function (
  req: Request,
  res: Response
): Promise<void> {
  const { department, email, name, password } =
    req.body as StudentCreationParams;

  const studentExists = await StudentModel.findOne({ email });
  if (!studentExists)
    throw new BadRequest("Student has already been created", "createUser");

  const student = await StudentModel.create({
    department,
    email,
    name,
    password,
  });

  res.status(httpStatus.OK).json({ message: "Student created", student });
};

export const assignTask = async function (
  req: Request,
  res: Response
): Promise<void> {
  const { studentId, name, email, dueTime } = req.body as TaskCreationParams;

  const task = await TaskModel.create({ studentId, dueTime, email, name });

  res.status(httpStatus.OK).json({ message: "Task created", task });
};
