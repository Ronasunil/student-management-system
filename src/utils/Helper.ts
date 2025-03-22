import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { PayLoad } from "../interfaces/student.interface";
import { config } from "../Config";
import { Response } from "express";

class Helper {
  private SALT_ROUND = 12;
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, this.SALT_ROUND);
    return hashedPassword;
  }

  signToken(payload: PayLoad): string {
    const token = sign(payload, config.JWT_SECRET!, {
      expiresIn: config.COOKIE_DURATION,
    });
    return token;
  }

  setCookie(res: Response, cookie: string) {
    res.cookie("jwt", cookie, {
      httpOnly: config.ENV === "Development",
      maxAge: config.COOKIE_DURATION,
    });
  }
}

export const helper = new Helper();
