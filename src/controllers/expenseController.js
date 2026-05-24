import e from "express";
import Expense from "../models/expenseModel.js";

class ExpenseController {
  static async create({ title, amount, category, date, description }) {
    if (amount < 0) {
      throw new Error("Amount must be a positive number");
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
      description,
    });

    return expense;
  }

  static async update({ id, title, amount, category, date, description }) {
    if (amount < 0) {
      throw new Error("Amount must be a positive number");
    }

    const expense = await Expense.findByPk(id);
    const updatedExpense = {
      id,
      title: title ? title : expense.title,
      amount: amount ? amount : expense.amount,
      category: category ? category : expense.category,
      date: date ? date : expense.date,
      description: description ? description : expense.description,
    };

    Expense.update(
      {
        title: updatedExpense.title,
        amount: updatedExpense.amount,
        category: updatedExpense.category,
        date: updatedExpense.date,
        description: updatedExpense.description,
      },
      {
        where: {
          id: id,
        },
      },
    );

    return updatedExpense;
  }

  static async getAll() {
    return await Expense.findAll();
  }

  static async getById(id) {
    return await Expense.findByPk(id);
  }

  static async delete(id) {
    return await Expense.destroy(id);
  }

  static async existsExpense(id) {
    return await Expense.findByPk(id);
  }
}

export default ExpenseController;
