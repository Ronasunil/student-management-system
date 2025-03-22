import dotenv from "dotenv";
import path from "path";
import { BadRequest } from "./error/BadRequest";

class Config {
  MONGO_URI: string | undefined;
  PORT: number | undefined;
  constructor() {
    this.loadEnv();
    this.MONGO_URI = process.env.MONGO_URI;
    this.PORT = +process.env.PORT!;
    this.validateEnv();
  }

  private loadEnv() {
    const envPath = path.join(__dirname, "../config.env");
    dotenv.config({ path: envPath });
  }

  private validateEnv() {
    for (let [key, value] of Object.entries(this)) {
      if (!value) throw new BadRequest(`${key} not found in env`, "Config.ts");
    }
  }
}

export const config = new Config();
