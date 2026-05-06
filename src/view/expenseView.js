import ExpenseController from "../controller/expenseController.js";

class ExpenseView {
  static create(req, res) {
    const { title, amount, category, date, description } = req.body;

    if (!title || !amount || !category || !date || !description) {
      res.status(400).send("All fields are required!");
    }

    try {
      const expense = ExpenseController.create({
        title,
        amount,
        category,
        date,
        description,
      });

      res.status(201).send(expense);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static updateAll(req, res) {
    const id = req.params.id;
    const { title, amount, category, date, description } = req.body;

    if (!ExpenseController.existsExpense(id)) {
      res.status(404).send("No expense found.");
    }

    if (!title || !amount || !category || !date || !description) {
      res.status(400).send("All fields are required!");
    }

    const expense = ExpenseController.update({
      id,
      title,
      amount,
      category,
      date,
      description,
    });

    res.status(200).send(expense);
  }

  static update(req, res) {
    const id = req.params.id;
    const { title, amount, category, date, description } = req.body;

    if (!ExpenseController.existsExpense(id)) {
      res.status(404).send("No expense found.");
    }

    const expense = ExpenseController.update({
      id,
      title,
      amount,
      category,
      date,
      description,
    });

    res.status(200).send(expense);
  }

  static getAll(req, res) {
    const expenses = ExpenseController.getAll();

    if (!expenses) {
      res.status(404).send("There aren't any expenses");
    }

    res.status(200).send(expenses);
  }

  static getById(req, res) {
    const id = req.params.id;
    const expense = ExpenseController.getById(id);

    if (!expense) {
      res.status(404).send("No expense found.");
    }

    res.status(200).send(expense);
  }

  static delete(req, res) {
    const id = req.params.id;
    const expense = ExpenseController.getById(id);

    if (!expense) {
      res.status(404).send("No expense found.");
    }

    ExpenseController.delete(id);

    res.status(204).end();
  }
}

export default ExpenseView;
