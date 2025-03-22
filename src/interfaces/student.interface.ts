import { Types, Document } from "mongoose";

export interface StudentDoc extends Document {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "Student";
  department: string;
  comparePassword: (password: string) => Promise<Boolean>;
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

export interface PayLoad {
  name: string;
  email: string;
  role: string;
  _id: string;
  iat?: number;
}
