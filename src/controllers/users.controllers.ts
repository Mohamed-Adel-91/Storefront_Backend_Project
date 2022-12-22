import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";


const usersModel = new userModel();

export const create = async(
req: Request, res: Response, next: NextFunction) => {
try {
    const user = await usersModel.create(req.body);
    res.send(`Welcome ${user.firstName}-${user.lastName}
    your user was created successfully and your ID is ${user.usersID}!!`);    
} catch (error) {
    next(error)  
    }
  };