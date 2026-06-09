import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../config/database.js";
import Category from "./categoryModel.js";

class Expense extends Model {
  static async getAll() {
    return await Expense.findAll({ include: Category });
  }

  static async getById(id) {
    return await Expense.findByPk(id);
  }

  static async createExpense({ title, amount, date, description, categoryId }) {
    if (amount < 0) {
      throw new Error("Amount must be a positive number");
    }

    if (!title) {
      throw new Error("The title field is required.");
    }

    return await Expense.create({
      title,
      amount,
      date,
      description,
      categoryId,
    });
  }
}

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

export default Expense;
