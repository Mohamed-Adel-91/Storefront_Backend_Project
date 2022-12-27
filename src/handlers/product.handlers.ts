import { Request, Response } from 'express';
import { products } from '../models/product.model';
import product from '../types/product.types';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../config';

const store = new products();

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
    const product: product = {
      Name: req.body.Name,
      Price: req.body.Price,
      Category: req.body.Category,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
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
    const deleted = await store.delete(req.body.productID);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

export const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

export const show = async (_req: Request, res: Response) => {
  const product = await store.show(_req.body.productID);
  res.json(product);
};
