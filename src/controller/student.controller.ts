import { Request, Response } from "express";
import httpsStatus from "http-status-codes";
import { StudentLoginParams } from "../interfaces/student.interface";
import { StudentModel } from "../models/student.model";
import { NotAuthorized } from "../error/NotAuthorized";
import { TaskModel } from "../models/task.model";
import { BadRequest } from "../error/BadRequest";
import { helper } from "../utils/Helper";

const studentLogin = async function (
  req: Request,
  res: Response
): Promise<void> {
  const { email, password } = req.body as StudentLoginParams;

  const student = await StudentModel.findOne({ email });
  if (!student)
    throw new NotAuthorized("Invalid email or password", "login student");

  const isPasswordSame = await student.comparePassword(password);
  if (!isPasswordSame)
    throw new NotAuthorized("Invalid email or password", "login student");

  // Signing token
  const token = helper.signToken({
    _id: student.id.toString(),
    email: student.email,
    name: student.name,
    role: student.role,
  });

  // Setting cookie
  helper.setCookie(res, token);

  res
    .status(httpsStatus.OK)
    .json({ message: "Login successfull", student: student });
};

const getTasks = async function (req: Request, res: Response): Promise<void> {
  const { studentId } = req.params as { studentId: string };

  // Checking studentId Exist
  if (!studentId)
    throw new BadRequest("Please pass the id of student", "getTask");

  //Checking student exist
  const student = await StudentModel.findById(studentId);
  if (!student)
    throw new BadRequest(
      `User not found regarding this id:${studentId}`,
      "getTask"
    );

  const tasks = await TaskModel.find({ studentId });

  res.status(httpsStatus.OK).json({ message: "Student tasks", tasks });
};

const getTaskStatus = async function (req: Request, res: Response) {
  const { studentId } = req.params as { studentId: string };

  // Checking studentId Exist
  if (!studentId)
    throw new BadRequest("Please pass the id of student", "getTask");

  //Checking student exist
  const student = await StudentModel.findById(studentId);
  if (!student)
    throw new BadRequest(
      `User not found regarding this id:${studentId}`,
      "getTask"
    );

  const tasks = await TaskModel.find({ studentId }).select(
    "-dueTime -createdAt"
  );

  res.status(httpsStatus.OK).json({ message: "Student tasks status", tasks });
};

const markAsCompleted = async function (
  req: Request,
  res: Response
): Promise<void> {
  const { taskId } = req.params as { taskId: string };

  // Checking taskId Exist
  if (!taskId)
    throw new BadRequest("Please pass the id of task", "markAsCompleted");

  //Checking task exists
  const task = await TaskModel.findOne({
    _id: taskId,
    studentId: req.user._id,
  });
  if (!task) throw new BadRequest(`Task not found `, "getTask");

  const updatedTask = await TaskModel.findByIdAndUpdate(taskId, {
    status: "Completed",
  });

  res
    .status(httpsStatus.OK)
    .json({ message: "Updated status of task", task: updatedTask });
};

export { studentLogin, getTaskStatus, getTasks, markAsCompleted };
