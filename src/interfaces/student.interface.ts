import { Types, Document } from "mongoose";

export interface StudentDoc extends Document {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "Student";
  department: string;
  createdAt: Date;
}

export interface StudentCreationParams {
  name: string;
  email: string;
  password: string;
  department: string;
}

export interface StudentLoginParams {
  email: string;
  password: string;
}
