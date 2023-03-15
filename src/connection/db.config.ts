import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
dotenv.config();

//recup les models
import { User } from "../models/User.model";
import { Recipe } from "../models/recipe/Recipe.model";
import { Etape } from "../models/recipe/Etape.model";
import { Novel } from "../models/novel/Novel.model";
import { Product } from "../models/scan/Product.model";
import { Chapter } from "../models/novel/Chapter.model";
import { LikesTab } from "../models/novel/LikesTabs.model";

// Créer une connexion à la base de données
const connection = new Sequelize(
  process.env.DB_NAME!, 
  process.env.DB_USER!, 
  process.env.DB_PASSWORD!, 
  {
    host: process.env.DB_HOST!,
    dialect: "mysql"
  }
);
connection.addModels([User, Recipe, Etape, Novel, Product, Chapter, LikesTab]); 


export default connection 