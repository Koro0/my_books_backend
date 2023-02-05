import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import connection from './connection/db.config';
import novelRoute from './routes/novel.route';

const cors = require('cors')
const app: Express = express();
const path = require('path');
const port = process.env.APP_PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req:Request, res:Response, next:NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

if (process.env.NODE_ENV === 'development') {
  connection
  .sync()
  .then(()=> {console.log('Database successfully connected')})
  .catch((err)=>{console.log('Error :', err)});

  

  app.use('/api/novel', novelRoute);
  app.use('/images', express.static(path.join(__dirname, 'images')));
  
} else {
  app.use('*', (req: Request, res: Response) => {
    res.redirect('https://github.com/Koro0/my_books_backend' + req.url);
  });
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
