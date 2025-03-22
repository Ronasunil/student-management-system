import mongoose, { Document, Types } from "mongoose";

export interface AdminLoginParams {
  email: string;
  password: string;
}

export interface AdminDoc extends Document {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<Boolean>;
}
