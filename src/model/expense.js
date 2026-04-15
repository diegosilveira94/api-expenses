class ExpenseModel {
  constructor() {
    this.expenses = [];
    this.idCounter = 1;
  }

  getAll() {
    return this.expenses;
  }

  getById(id) {
    return this.expenses.find((e) => e.id === id);
  }

  create(title, value, description) {
    const newExpense = {
      id: this.idCounter++,
      title,
      description,
      value,
      createdAt: new Date().toISOString(),
    };
    this.expenses.push(newExpense);

    return newExpense;
  }

  update(title, value, description) {
    const index = this.expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return null;
    }

    this.expenses[index] = {
      ...this.expenses[index],
      title,
      description,
      value,
    };

    return this.expenses[index];
  }

  delete(id) {
    const index = this.expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return null;
    }

    this.expenses.splice(index, 1);

    return null;
  }
}

export default new ExpenseModel();
