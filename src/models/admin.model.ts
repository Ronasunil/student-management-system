import { model, Schema } from "mongoose";
import { AdminDoc } from "../interfaces/admin";
import { compare, hash } from "bcrypt";

const SALT_ROUND = 10;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must be atleast 3 characters long"],
    maxLength: [32, "Name cannot excessed more than 32 character"],
  },

  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minLength: [5, "Password must be atleast 5 characters long"],
  },
});

adminSchema.pre("save", async function (this: AdminDoc, next: () => void) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, SALT_ROUND);
});

adminSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  const adminPassword = (this as AdminDoc).password;
  const isPasswordSame = await compare(password, adminPassword);
  return isPasswordSame;
};

export const AdminModel = model<AdminDoc>("Admin", adminSchema);

// Create default admin if it doesn't exist
export const createDefaultAdmin = async function (): Promise<void> {
  try {
    const admin = { email: "admin@admin.com", password: "admin", name: "Rona" };

    const adminExists = await AdminModel.findOne({ email: admin.email });

    if (adminExists) return;
    await AdminModel.create(admin);
  } catch (err) {
    console.log("Error creatinf default admin", err);
  }
};
