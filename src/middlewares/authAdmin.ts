import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { User } from '../models/User.model';
dotenv.config();

const authenticateAdmin = async (
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
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as any; // return un tableau {user:{userI,adminStatus}}
    console.log(decodedToken);
    if (decodedToken.user && decodedToken.user.userId) {
      const { userId, adminStatus } = decodedToken.user;

      if (adminStatus !== 1 && req.body.userId !== userId) {
        throw new Error('Invalid user ID or not an admin');
      } else {
        return next();
      }
    }
  } catch (err: any) {
    return res
      .status(401)
      .json({ error: err.message || 'Invalid token or unauthorized' });
  }
};
export default authenticateAdmin;
