import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { AdminLoginParams } from "../interfaces/admin";
import { AdminModel } from "../models/admin.model";
import { NotAuthorized } from "../error/NotAuthorized";

const login = async function (req: Request, res: Response) {
  const { email, password } = req.body as AdminLoginParams;

  //   Check admin exist
  const adminExists = await AdminModel.findOne({ email }).select("-password");
  if (!adminExists)
    throw new NotAuthorized("Email or password is incorrect", "login");
  // Check password is same
  const isPasswordSame = await adminExists.comparePassword(password);
  if (!isPasswordSame)
    throw new NotAuthorized("Email or password is incorrect", "login");

  res
    .status(httpStatus.OK)
    .json({ message: "Login successfull", admin: adminExists });
};
