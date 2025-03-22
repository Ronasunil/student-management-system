import dotenv from "dotenv";
import path from "path";
import { BadRequest } from "./error/BadRequest";

class Config {
  MONGO_URI: string | undefined;
  PORT: number | undefined;
  JWT_SECRET: string | undefined;
  ENV: string | undefined;
  COOKIE_DURATION: number | undefined;
  constructor() {
    this.loadEnv();
    this.MONGO_URI = process.env.MONGO_URI;
    this.PORT = +process.env.PORT!;
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.ENV = process.env.ENV;
    this.COOKIE_DURATION = +process.env.COOKIE_DURATION!;
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
