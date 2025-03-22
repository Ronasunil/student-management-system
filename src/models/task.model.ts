import { model, Schema, Types } from "mongoose";
import { TaskDoc } from "../interfaces/task.interface";

const taskSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    index: true,
    ref: "User",
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  dueTime: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Overdue", "Completed"],
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TaskModel = model<TaskDoc>("Task", taskSchema);

export { TaskModel };
