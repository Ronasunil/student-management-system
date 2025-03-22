import { Request, Response } from "express";
import httpsStatus from "http-status-codes";
import { StudentLoginParams } from "../interfaces/student.interface";
import { StudentModel } from "../models/student.model";
import { NotAuthorized } from "../error/NotAuthorized";
import { TaskModel } from "../models/task.model";
import { BadRequest } from "../error/BadRequest";

export const login = async function (
  req: Request,
  res: Response
): Promise<void> {
  const { email, password } = req.body as StudentLoginParams;

  const studentExists = await StudentModel.findOne({ email });
  if (!studentExists)
    throw new NotAuthorized("Invalid email or password", "login student");

  const isPasswordSame = await studentExists.comparePassword(password);
  if (!isPasswordSame)
    throw new NotAuthorized("Invalid email or password", "login student");

  res
    .status(httpsStatus.OK)
    .json({ message: "Login successfull", student: studentExists });
};

export const getTasks = async function (
  req: Request,
  res: Response
): Promise<void> {
  const { studentId } = req.params as { studentId: string };

  // Before hand checking student exist
  const student = await StudentModel.findById(studentId);
  if (!student)
    throw new BadRequest(
      `User not found regarding this id:${studentId}`,
      "getTask"
    );

  const tasks = await TaskModel.find({ studentId });

  res.status(httpsStatus.OK).json({ message: "Student tasks", tasks });
};

export const markAsCompleted = async function (
  req: Request,
  res: Response
): Promise<void> {
  const { taskId } = req.params as { taskId: string };

  // Before hand checking task exists
  const task = await TaskModel.findById(taskId);
  if (!task)
    throw new BadRequest(
      `Task not found regarding this id:${taskId}`,
      "getTask"
    );

  const updatedTask = await TaskModel.findByIdAndUpdate(taskId, {
    status: "Completed",
  });

  res
    .status(httpsStatus.OK)
    .json({ message: "Updated status of task", task: updatedTask });
};
