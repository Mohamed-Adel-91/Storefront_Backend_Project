import express from "express";
import Error from "../interfaces/error.interface";

const errorMiddleware = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const status = error.status || 500;
  const massage = error.message || "something wrong is happened";
  res.status(status).json({ status, massage });
  next();
};

export default errorMiddleware;
