import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

export const sequelize = new Sequelize(
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  },
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Failed to connect to database:", err));
