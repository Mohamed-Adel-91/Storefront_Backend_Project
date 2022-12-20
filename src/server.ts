import express, { Application } from 'express';


const port = 3000;

const app: Application = express();


app.get('/',  (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
  });

app.listen(port, () => {
    console.log(`starting app on: ${port}`);
  });

export default app;