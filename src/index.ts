import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = 5000;

if (process.env.NODE_ENV === 'development') {
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
} else {
  app.get('*', (req: Request, res: Response) => {
    res.redirect('https://github.com/Koro0/my_books_backend' + req.url);
  });
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
