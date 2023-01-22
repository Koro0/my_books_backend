import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

// Créer une connexion à la base de données
const connection = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql"
});

export default connection;