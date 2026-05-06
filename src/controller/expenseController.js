import e from "express";
import ExpenseModel from "../model/expenseModel.js";

class ExpenseController {
  static create({ title, amount, category, date, description }) {
    if (amount < 0) {
      throw new Error("Amount must be a positive number");
    }

    const expense = ExpenseModel.createExpense({
      title,
      amount,
      category,
      date,
      description,
    });

    return expense;
  }

  static update({ id, title, amount, category, date, description }) {
    const expense = ExpenseModel.getById(id);
    const updatedExpense = {
      id,
      title: title ? title : expense.title,
      amount: amount ? amount : expense.amount,
      category: category ? category : expense.category,
      date: date ? date : expense.date,
      description: description ? description : expense.description,
    };

    return ExpenseModel.update({
      ...updatedExpense,
    });
  }

  static getAll() {
    return ExpenseModel.getAll();
  }

  static getById(id) {
    return ExpenseModel.getById(id);
  }

  static delete(id) {
    return ExpenseModel.delete(id);
  }

  static existsExpense(id) {
    return ExpenseModel.existsExpense(id);
  }
}

export default ExpenseController;
