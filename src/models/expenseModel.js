import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import Category from "./categoryModel.js";

class Expense extends Model {
  static async getAll() {
    return await Expense.findAll({ include: Category });
  }

  static async getById(id) {
    return await Expense.findByPk(id);
  }

  static async createExpense({
    description,
    amount,
    date,
    status,
    categoryId,
    userId,
  }) {
    return await Expense.create({
      amount,
      date,
      description,
      status,
      categoryId,
      userId,
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
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
    status: {
      type: DataTypes.ENUM("PENDENTE", "PAGA"),
      allowNull: false,
      defaultValue: "PENDENTE",
      validate: {
        isIn: {
          args: [["PENDENTE", "PAGA"]],
          msg: "Status must be 'PENDENTE' or 'PAGA'",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Expense",
  },
);

export default Expense;
