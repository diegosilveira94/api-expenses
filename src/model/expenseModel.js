import { randomUUID } from "crypto";
import { Sequelize } from "sequelize";

class ExpenseModel {
  static expenses = [];

  static createExpense({ title, amount, category, date, description }) {
    const newExpense = {
      id: randomUUID(),
      title,
      amount,
      category,
      date,
      description,
      createdAt: new Date().toISOString(),
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  static update({ id, title, amount, category, date, description }) {
    const index = this.expenses.findIndex((e) => e.id === id);

    // no expense found in the array
    if (index === -1) {
      return null;
    }

    this.expenses[index] = {
      ...this.expenses[index],
      title,
      amount,
      category,
      date,
      description,
    };

    return this.expenses[index];
  }

  static getAll() {
    return this.expenses;
  }

  static getById(id) {
    const index = this.expenses.findIndex((e) => e.id === id);

    // no expense found in the array
    if (index === -1) {
      return null;
    }

    return this.expenses[index];
  }

  static delete(id) {
    const index = this.expenses.findIndex((e) => e.id === id);

    // no expense found in the array
    if (index === -1) {
      return null;
    }

    return this.expenses.splice(index, 1);
  }

  static existsExpense(id) {
    const index = this.expenses.findIndex((e) => e.id === id);

    // no expense found in the array
    if (index === -1) {
      return null;
    }

    return true;
  }
}

export default ExpenseModel;
