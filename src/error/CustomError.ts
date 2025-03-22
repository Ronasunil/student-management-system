import { ErrorMsg } from "../interfaces/error";

abstract class CustomError extends Error {
  abstract status: string;
  abstract statusCode: number;
  constructor(err: string, public comingFrom: string) {
    super(err);
    this.comingFrom = comingFrom;
  }

  abstract formatError(): ErrorMsg[];
}

export { CustomError };
