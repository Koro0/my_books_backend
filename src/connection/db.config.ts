import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { Novel } from "../models/novel/Novel.model";
import { User } from "../models/User.model";
import { Product } from "../models/scan/Product.model";
import { Chapter } from "../models/novel/Chapter.model";
import { LikesTab } from "../models/novel/LikesTabs.model";
import { Etape } from "../models/recipe.model/etape.model";
import { Recipe } from "../models/recipe.model/Recipe.model";
dotenv.config();

// Créer une connexion à la base de données
const connection = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!,  process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql"
});
connection.addModels([Novel, User, Product, Chapter, LikesTab, Etape, Recipe]); 


export default connection;