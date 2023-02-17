import { Request, Response } from 'express';
import bcrypt =  require('bcrypt');
import jwt = require('jsonwebtoken');
import {User} from '../models/user.model';
require('dotenv').config();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const user = await User.findOne( email );
    if (user) {
      return res.status(400).json({ msg: 'L\'utilisateur existe déjà' });
    }

    // Créer un nouvel utilisateur
    const newUser = new User({
      name,
      email,
      password
    });

    // Hash le mot de passe
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    // Créer et signer le jeton JWT
    const payload = {
      user: {
        id: newUser.id
      }
    };
    jwt.sign(
      payload,
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
