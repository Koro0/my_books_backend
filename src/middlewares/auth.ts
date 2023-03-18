import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

interface TokenPayload {
  userId: number;
}

 const authenticate = (
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
    if(req.body.userId && req.body.userId !== userId){
      throw 'Invalid user ID';
    } else {
      return next();
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
export default authenticate;
