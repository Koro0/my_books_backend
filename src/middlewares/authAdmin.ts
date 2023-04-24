import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { User } from '../models/User.model';
dotenv.config();

// Typer userId
interface TokenPayload {
    userId: number;
  }
   const authenticateAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Récupérer le token JWT du header "Authorization"
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ error: 'Missing Authorization header' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      // Valider le token JWT
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
      const userId = decodedToken.userId; // stocker l'ID de l'utilisateur dans la requête
      const isAdmin = User.findOne({where:{userId:userId, adminStatus:0}});
      if(req.body.userId && userId && req.body.userId !== userId && !isAdmin) {
        throw 'Invalid user ID';
      } else {
        return next();
      }
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
  export default authenticateAdmin;