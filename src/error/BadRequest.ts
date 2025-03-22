import httpStatus from "http-status-codes";
import { CustomError } from "./CustomError";
import { ErrorMsg } from "../interfaces/error";

class BadRequest extends CustomError {
  statusCode = httpStatus.BAD_REQUEST;
  status = "FAILED";
  constructor(err: string, comingFrom: string) {
    super(err, comingFrom);
  }
  formatError(): ErrorMsg[] {
    return [
      {
        comingFrom: this.comingFrom,
        message: this.message,
        status: this.status,
        statusCode: this.statusCode,
      },
    ];
  }
}

export { BadRequest };
