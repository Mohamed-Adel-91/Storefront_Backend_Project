import { NextFunction, Request, Response } from 'express';
import config from '../config';
import jwt, { Secret } from 'jsonwebtoken';
import Error from '../interfaces/error.interface';

const verifyAuthToken = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const bearer = authorizationHeader.split(' ')[0].toLowerCase();
      const token = authorizationHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decoded = jwt.verify(token, config.tokenSecret as Secret);
        if (decoded) {
          next();
        } else {
          //failed to authenticate user
          const error: Error = new Error(
            'Access denied, invalid token and Login failed because its Unauthorized please try again ..!!'
          );
          error.status = 401;
          next(error);
        }
      } else {
        //token type not bearer
        const error: Error = new Error(
          'Access denied, token type not bearer please try again ..!!'
        );
        error.status = 401;
        next(error);
      }
    } else {
      // no token provided
      const error: Error = new Error(
        'Access denied, no token provided please try again ..!!'
      );
      error.status = 401;
      next(error);
    }
    //failed to authenticate user
  } catch (error) {
    const err: Error = new Error(
      'Access denied, failed to authenticate user please try again ..!!'
    );
    err.status = 401;
    next(error);
  }
};

export default verifyAuthToken;
