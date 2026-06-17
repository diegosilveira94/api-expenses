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

  static async update({ id, description, amount, date, status }) {
    const expense = await Expense.findByPk(id);
    const updatedExpense = {
      id,
      amount: amount ? amount : expense.amount,
      date: date ? date : expense.date,
      description: description ? description : expense.description,
      status: status ? status : expense.status,
    };

    await Expense.update(
      {
        amount: updatedExpense.amount,
        date: updatedExpense.date,
        description: updatedExpense.description,
        status: updatedExpense.status,
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
    return await Expense.destroy({ where: { id } });
  }

  static async existsExpense(id) {
    return await Expense.findByPk(id);
  }
}

export default ExpenseController;
