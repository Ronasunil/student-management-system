import { Types } from "mongoose";
import { StudentDoc } from "./student.interface";

export interface TaskDoc {
  _id: string | Types.ObjectId;
  studentId: string | StudentDoc;
  email: string;
  name: string;
  dueTime: string;
  status: "Pending" | "Overdue" | "Completed";
  createdAt: Date;
}

export interface TaskCreationParams {
  studentId: string;
  name: string;
  email: string;
  dueTime: Date;
}
