import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../config/database.js";

class Expense extends Model {}
Expense.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Expense",
  },
);

await Expense.sync({ alter: true });
console.info("The table for the Expense Model was just (re)created!");

export default Expense;
