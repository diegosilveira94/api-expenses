import ExpenseModel from '../model/expense.js';

class ExpenseController {
  getAll() {
    return ExpenseModel.getAll();
  }

  getById(id) {
    return ExpenseModel.getById(id);
  }

  create(title, value, description) {
    if (value <= 0) {
      throw new Error('O valor da despesa deve ser maior que zero.');
    }

    return ExpenseModel.create(title, value, description);
  }

  update(id, title, value, description) {
    if (value <= 0) {
      throw new Error('O valor da despesa deve ser maior que zero.');
    }

    return ExpenseModel.update(id, title, value, description);
  }

  delete(id) {
    return ExpenseModel.delete(id);
  }
}

export default ExpenseController;
