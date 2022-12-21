import bodyParser from "body-parser";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import errorMiddleware from "./middleware/error.middleware";
import config from "./middleware/config";
import db from "./database";

const port = config.port || 3000;

const app: Application = express();

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(helmet());
app.use(errorMiddleware);

// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message:
      "Too many requests from this IP, Please try again after 15 minutes",
  })
);

db.connect().then((client) => {
  return client
    .query("SELECT NOW()")
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
});

app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({
    message: "What do you do ? some wrong was happened :o",
  });
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.post("/", (req: express.Request, res: express.Response) => {
  res.json({
    message: "Hello World! from Post",
    data: req.body,
  });
});

app.listen(port, () => {
  console.log(`starting app on: ${port}`);
});

export default app;
