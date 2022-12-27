import express from 'express';
import userModel from '../models/user.model';
import config from '../config';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../types/user.type';

const store = new userModel();

export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, config.tokenSecret as Secret);
    if (!newUser) {
      return res.status(401).send({
        message: 'The user name or password is not correct please try again',
      });
    }
    return res.json({
      message: 'user is authorized',
      data: { ...newUser, token },
    });
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
    const users = await store.index();
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
    const user = await store.show(req.params.userName as unknown as string);
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
    const user = await store.update(req.body.userName);
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
    const user = await store.delete(req.params.userName as unknown as number);
    return res.json(user);
  } catch (error) {
    next(error);
  }
};
