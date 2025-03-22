import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { BadRequest } from "../error/BadRequest";
import { PayLoad } from "../interfaces/student.interface";

declare global {
  namespace Express {
    interface Request {
      user: PayLoad;
    }
  }
}

export const validateJoi = function (
  schema: Schema
): (req: Request, res: Response, next: NextFunction) => void {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req.body);
    if (error?.details)
      throw new BadRequest(error.details[0].message, "validateJoi");

    next();
  };
};

export const accessOnly = function (
  role: string
): (req: Request, res: Response, next: NextFunction) => void {
  return function (req: Request, res: Response, next: NextFunction) {
    if (role === req.user.role) return next();
  };
};
