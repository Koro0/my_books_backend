import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { Novel } from "../models/Novel.model";
import { User } from "../models/User.model";
import { Product } from "../models/Product.model";
import { Chapter } from "../models/chapter.model";
import { LikesTab } from "../models/likesTabs.model";
dotenv.config();

// Créer une connexion à la base de données
const connection = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!,  process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql"
});
connection.addModels([Novel, User, Product, Chapter, LikesTab]); 


export default connection;