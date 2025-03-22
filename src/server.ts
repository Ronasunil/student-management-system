import mongoose from "mongoose";
import { config } from "./Config";
import { app } from "./app";
import { createDefaultAdmin } from "./models/admin.model";

const PORT = config.PORT || 2000;

const connectToMongodb = async function () {
  try {
    await mongoose.connect(config.MONGO_URI!);
    console.log("Connected to mongodb");
  } catch (err) {
    console.log("Error connecting to mongodb", err);
  }
};

const startServer = async function () {
  await connectToMongodb();
  await createDefaultAdmin();
  app.listen(PORT, () => {
    console.log(`Server started on port:${PORT}`);
  });
};

startServer();
