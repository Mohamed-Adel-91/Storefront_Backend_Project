import { Router, Request, Response } from "express";


const routes = Router();
routes.get("/", (req: Request, res: Response) => {
    res.send("Welcome Request from orders routes !!");
  });

export default routes;