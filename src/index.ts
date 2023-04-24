import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import connection from './connection/db.config';
import novelRoute from './routes/novel.route';
import recipeRoute from './routes/recipe.route';
import userRoute from './routes/user.route';
import commentRoute from './routes/comments.route';
import cocktailRoute from './routes/cocktail.route';


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
  .then(()=> {
    console.log('Database successfully connected');
  
    app.use('/api/novel', novelRoute);
    app.use('/api/recipe', recipeRoute);
    app.use('/api/cocktail', cocktailRoute);
    app.use('/images', express.static(path.join(__dirname, 'images')));
    app.use('/api/users', userRoute);
    app.use('/api/comment', commentRoute);

  })
  .catch((err)=>{console.log('Error :', err)});
  
} else {
  connection
  .sync({force: true})
  .then(()=> {
    console.log('Database successfully connected');
    app.use('*', (req: Request, res: Response) => {
      res.redirect('https://github.com/Koro0/my_books_backend' + req.url);
    });
  })
  .catch((err)=>{console.log('Error :', err)});
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});