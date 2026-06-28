import Expense from "../models/expenseModel.js";
import Category from "../models/categoryModel.js";
import Sequelize from "sequelize";

class ExpenseController {
  static async create({
    description,
    amount,
    date,
    status,
    categoryId,
    userId,
  }) {
    const result = await Expense.createExpense({
      amount,
      date,
      description,
      categoryId,
      status,
      userId,
    });

    return result;
  }

  static async update({ id, description, amount, date, status, userId }) {
    const expense = await Expense.findOne({ where: { id, userId } });

    if (!expense) return null;

    await expense.update({
      amount: amount ?? expense.amount,
      date: date ?? expense.date,
      description: description ?? expense.description,
      status: status ?? expense.status,
    });

    return expense;
  }

  static async getAll({
    userId,
    status,
    categoryId,
    minAmount,
    maxAmount,
    startDate,
    endDate,
  }) {
    const where = { userId };

    if (status) where.status = status;
    if (categoryId) where.categoryId = categoryId;
    if (minAmount || maxAmount) {
      where.amount = {};
      if (minAmount) where.amount[Sequelize.Op.gte] = minAmount;
      if (maxAmount) where.amount[Sequelize.Op.lte] = maxAmount;
    }
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date[Sequelize.Op.gte] = startDate;
      if (endDate) where.date[Sequelize.Op.lte] = endDate;
    }

    return await Expense.findAll({ where, include: Category });
  }

  static async getById({ id, userId }) {
    return await Expense.findOne({ where: { id, userId } });
  }

  static async delete({ id, userId }) {
    return await Expense.destroy({ where: { id, userId } });
  }
}

export default ExpenseController;
