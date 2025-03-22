import { model, Schema } from "mongoose";

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
  },

  password: {
    type: String,
    required: true,
    minLength: [5, "Name must be atleast 8 characters long"],
  },
});

const AdminModel = model("Admin", adminSchema);

const createDefaultAdmin = async function () {
  try {
    const admin = { email: "admin@admin.com", password: "admin" };
    const adminExists = await AdminModel.findOne({ email: admin.email });

    if (!adminExists) return;
    await AdminModel.create();
  } catch (err) {
    console.log("Error creatinf default admin", err);
  }
};

createDefaultAdmin();
