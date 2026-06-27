import Expense from "../models/expenseModel.js";

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

  static async getAll({ userId }) {
    return await Expense.findAll({ where: { userId } });
  }

  static async getById({ id, userId }) {
    return await Expense.findOne({ where: { id, userId } });
  }

  static async delete({ id, userId }) {
    return await Expense.destroy({ where: { id, userId } });
  }
}

export default ExpenseController;
