import { NextFunction, Request, Response } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';
import Error from '../interfaces/error.interface';

const Errorhandler = (next: NextFunction) => {
  const error: Error = new Error(
    'Login failed because its Unauthorized please try again ..!!'
  );
  error.status = 401;
  next(error);
};

const validateToken = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    // get authHeader
    const authHeader = req.get('Authorization');
    // check authHeader validate
    if (authHeader) {
      //get value of token
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      //check if bearer token or not
      if (token && bearer === 'bearer') {
        //verify token or decoded based on tokenSecret
        const decode = jwt.verify(
          token,
          config.tokenSecret as unknown as string
        );
        if (decode) {
          next();
        } else {
          //failed to authenticate user
          Errorhandler(next);
        }
      } else {
        //token type not bearer
        Errorhandler(next);
      }
    } else {
      // no token provided
      Errorhandler(next);
    }
    //failed to authenticate user
  } catch (error) {
    Errorhandler(next);
  }
};

export default validateToken;
