import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { BadRequest } from "../error/BadRequest";
import { PayLoad } from "../interfaces/student.interface";
import { verify } from "jsonwebtoken";
import { config } from "../Config";
import { NotAuthorized } from "../error/NotAuthorized";
import { AdminModel } from "../models/admin.model";
import { StudentModel } from "../models/student.model";

declare global {
  namespace Express {
    interface Request {
      user: PayLoad;
    }
  }
}

const validateSchema = function (
  schema: Schema
): (req: Request, res: Response, next: NextFunction) => void {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req.body);
    if (error?.details)
      throw new BadRequest(error.details[0].message, "validateJoi");

    next();
  };
};

const accessOnly = function (
  role: string
): (req: Request, res: Response, next: NextFunction) => void {
  return function (req: Request, res: Response, next: NextFunction) {
    if (role !== req.user.role)
      throw new NotAuthorized(`${req.user.role} can't acess this route`, "");

    return next();
  };
};

const isAuthenticated = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { jwt } = req.cookies;
    const decoded = verify(jwt, config.JWT_SECRET!) as PayLoad;
    req.user = decoded;
    next();
  } catch (err) {
    throw new NotAuthorized("Invalid Token", "isAuthenticated");
  }
};

const verifyUserExitence = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const admin = await AdminModel.findById(req.user._id);
  if (admin) return next();

  const student = await StudentModel.findById(req.user._id);
  if (student) return next();

  throw new NotAuthorized("User not found", "verifyUserExitence");
};

export { validateSchema, verifyUserExitence, isAuthenticated, accessOnly };
