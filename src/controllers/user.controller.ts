import { Request, Response } from 'express';
import bcrypt =  require('bcrypt');
import jwt = require('jsonwebtoken');
import {User} from '../models/user.model';
require('dotenv').config();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const USER = await User.findOne( email );
    if (USER) {
      return res.status(400).json({ msg: 'L\'utilisateur existe déjà' });
    }

    // Créer un nouvel utilisateur
    const NEW_USER = new User({
      name,
      email,
      password
    });

    // Hash le mot de passe
    const SALT = await bcrypt.genSalt(10);
    NEW_USER.password = await bcrypt.hash(password, SALT);

    // Sauvegarder l'utilisateur dans la base de données
    await NEW_USER.save();

    // Créer et signer le jeton JWT
    const PAYLAOD = {
      user: {
        id: NEW_USER.id
      }
    };
    jwt.sign(
      PAYLAOD,
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error({err});
    res.status(500).send('Erreur de serveur');
  }
};
