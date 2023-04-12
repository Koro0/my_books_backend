import { Request, Response } from 'express';
import bcrypt =  require('bcrypt');
import jwt = require('jsonwebtoken');
import { User } from '../models/User.model';
require('dotenv').config();

export  const createUser = async (req: Request, res: Response) => {

  try {
    const { pseudo, email, password } = req.body;
    if (!pseudo || !email || !password ) {
      return res.status(400).json({
        message: 'toutes les champs doivent être rempli'
      })
    }
    // Vérifier si l'utilisateur existe déjà
    const USER_EXIST = await User.findOne( email );
    if (USER_EXIST) {
      return res.status(400).json({ msg: 'L\'utilisateur existe déjà' });
    }

    // Créer un nouvel utilisateur
    const NEW_USER = new User({
      pseudo,
      email,
      password,
      admin:false
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

export const login = async (req:Request, res:Response) => {
  const {email, password}= req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({where:{email:email}})
    if(!user) {
      res.send(400).json({message: "identifiant incorrect !"})
    };
    const PAYLAOD = {
      user: {
        id: user!.id
      }
    };
    bcrypt
        .compare(password, user!.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: 'Mot de passe incorrecte!' });
          }
          res.status(200).json({
            userId: user!.id,
            token: jwt.sign(
              PAYLAOD,
              process.env.JWT_SECRET!,
              { expiresIn: '5h' }, 
              (err, token) => {
                if (err) throw err;
                res.json({ token });
              }
            ),
          });
        })
        .catch(() => res.status(500).json({ error: 'error bcrypt' }));
  }
  catch (error) {
    res.status(400).json({message:"error Connexion !"})
  }
}