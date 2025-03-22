import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { CustomError } from "./CustomError";

export const handleError = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json(err.formatError());
    return;
  }
  console.log("Unknown Error occured");
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
    status: "ERROR",
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
  });
};

export const handleInvalidRoute = function (req: Request, res: Response) {
  const message = `The Request url: ${req.protocol}://${req.get("host")}:${
    req.originalUrl
  }`;
  res
    .status(httpStatus.NOT_FOUND)
    .json({ message, status: "FAILED", statusCode: httpStatus.NOT_FOUND });
};
