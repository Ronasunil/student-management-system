import httpStatus from "http-status-codes";

import { CustomError } from "./CustomError";
import { ErrorMsg } from "../interfaces/error";

class NotAuthorized extends CustomError {
  status = "FAILED";
  statusCode = httpStatus.UNAUTHORIZED;
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

export { NotAuthorized };
