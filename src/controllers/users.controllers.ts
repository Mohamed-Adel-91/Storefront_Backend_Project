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

export const getAllUsers =async (
    _req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const users = await usersModel.getAllUsers();
        res.json({
            massage: 'Successfully users retrieved',
            data: users,
        })
    } catch (error) {
        next(error);
    }
};

export const getOneUser =async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const user = await usersModel.getOneUser(req.params.userID as unknown as number);
        res.json({
            massage: 'Successfully user retrieved',
            data: user,
        })
    } catch (error) {
        next(error);
    }
};

export const updateOneUser =async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const user = await usersModel.updateOneUser(req.body);
        res.json({
            massage: 'Successfully user updated',
            data: user,
        })
    } catch (error) {
        next(error);
    }
};

export const deleteOneUser =async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const user = await usersModel.deleteOneUser(req.params.userID as unknown as number);
        res.json({
            massage: 'Successfully user deleted',
            data: user,
        })
    } catch (error) {
        next(error);
    }
};