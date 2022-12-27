import { Request, Response } from 'express';
import { Orders } from '../models/orders.models';
import orders from '../types/orders.type';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../config';

const store = new Orders();

export const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, config.tokenSecret as Secret);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  try {
    const orders: orders = {
      usersID: req.body.usersID,
      Status: req.body.Status,
    };
    const newOrder = await store.create(orders);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, config.tokenSecret as Secret);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }

  try {
    const deleted = await store.delete(req.body.orderID);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

export const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

export const show = async (_req: Request, res: Response) => {
  const order = await store.show(_req.body.orderID);
  res.json(order);
};
