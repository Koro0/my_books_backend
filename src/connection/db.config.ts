import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
dotenv.config();

//recup les models
import { User } from "../models/User.model";
import { Recipe } from "../models/recipe/Recipe.model";
import { Novel } from "../models/novel/Novel.model";
import { Product } from "../models/scan/Product.model";
import { Chapter } from "../models/novel/Chapter.model";
import { LikesTab } from "../models/LikesTabs.model";
import { Cocktail } from "../models/recipe/Cocktail.model";
import { Ingredient } from "../models/recipe/Ingredient.model";
import { Method } from "../models/recipe/Method.model";
import { Comments } from "../models/Comments.models";

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
connection.addModels([User, Recipe, Cocktail, Novel, Product, Chapter, LikesTab, Comments, Ingredient, Method]); 


export default connection 