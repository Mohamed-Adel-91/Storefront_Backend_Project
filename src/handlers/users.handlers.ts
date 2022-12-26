import { NextFunction, Request, Response } from 'express';
import userModel from '../models/user.model';
import config from '../config';
import jwt from 'jsonwebtoken';

const usersModel = new userModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await usersModel.create(req.body);
    return res.send({
      message: 'Welcome, your user has been created ..!!',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await usersModel.index();
    return res.send({
      message: 'users retrieved',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await usersModel.show(
      req.params.usersID as unknown as string
    );
    return res.send({
      message: 'user retrieved',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await usersModel.update(req.body);
    return res.send({
      message: 'user updated',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await usersModel.delete(
      req.params.usersID as unknown as number
    );
    return res.send({
      message: 'user deleted',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { usersID, password } = req.body;
    const user = await usersModel.authenticate(usersID, password);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    if (!user) {
      return res.status(401).send({
        message: 'The user name or password is not correct please try again',
      });
    }
    return res.send({
      message: 'user is authorized',
      data: { ...user, token },
    });
  } catch (error) {
    next(error);
  }
};
