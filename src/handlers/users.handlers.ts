import express from 'express';
import userModel from '../models/user.model';
import config from '../config';
import jwt from 'jsonwebtoken';

const usersModel = new userModel();

export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await usersModel.create(req.body);
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export const index = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const users = await usersModel.index();
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

export const show = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await usersModel.show(
      req.params.usersID as unknown as string
    );
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await usersModel.update(req.body.usersID);
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await usersModel.delete(
      req.params.usersID as unknown as number
    );
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
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
