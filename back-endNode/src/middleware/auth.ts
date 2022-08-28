import { NextFunction, Request, Response } from "express";
import { User, validateUser, Iusers } from "../models/user.model";
import config from "../config"

const jwt = require("jsonwebtoken");

export const AuthenticationMiddleware = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //Get Token From Header Of Request And Check If Token Is Exist
    const token: string | undefined = req.header("Authentication");
    if (!token) return next("الوصول مرفوض ، لم يتم توفير رمز مميز");

    //decoded Token And Find In Mongoo db By id Then CHeck If user Exist
    const decoded: any = jwt.verify(token,config.secretToken );
    const user = await User.findById(decoded._id);
    if (!user) return next("Invalid Token");
    //if (!user.status) return res.status(400).send('user not active');

    // Set Current User To locals
    res.locals.user = user;

    // call next Middleware
    return next();
  } catch (ex) {
    next("Invalid Token");
  }
};
