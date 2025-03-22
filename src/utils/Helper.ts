import { hash } from "bcrypt";

class Helper {
  private SALT_ROUND = 12;
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, this.SALT_ROUND);
    return hashedPassword;
  }
}

export const helper = new Helper();
