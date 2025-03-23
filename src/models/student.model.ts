import { model, Schema } from "mongoose";
import { StudentDoc } from "../interfaces/student.interface";
import { compare } from "bcrypt";
import { helper } from "../utils/Helper";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Name must be atleast 3 characters long"],
      maxLength: [32, "Name cannot excessed more than 32 character"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["Student"],
      default: "Student",
    },

    password: {
      type: String,
      required: true,
      minLength: [5, "Password must be atleast 5 characters long"],
    },

    department: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: function (_doc, ret: Partial<StudentDoc>) {
        delete ret.password;
        return ret;
      },
    },
  }
);

studentSchema.pre("save", async function (this: StudentDoc, next: () => void) {
  if (!this.isModified("password")) return;
  this.password = await helper.hashPassword(this.password);
});

studentSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  const userPassword = (this as StudentDoc).password;
  const isPasswordSame = await compare(password, userPassword);
  return isPasswordSame;
};

const StudentModel = model<StudentDoc>("User", studentSchema);

export { StudentModel };
