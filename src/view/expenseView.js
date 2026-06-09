import ExpenseController from "../controllers/expenseController.js";

class ExpenseView {
  static async create(req, res) {
    const { title, amount, date, description, categoryId } = req.body;

    // if (!title || !amount || !category || !date || !description) {
    //   res.status(400).send("All fields are required!");
    // }

    try {
      const expense = await ExpenseController.create({
        title,
        amount,
        date,
        description,
        categoryId,
      });

      res.status(201).send(expense);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async updateAll(req, res) {
    const id = req.params.id;
    const { title, amount, category, date, description } = req.body;

    if (!ExpenseController.existsExpense(id)) {
      res.status(404).send("No expense found.");
    }

    if (!title || !amount || !category || !date || !description) {
      res.status(400).send("All fields are required!");
    }

    const expense = await ExpenseController.update({
      id,
      title,
      amount,
      category,
      date,
      description,
    });

    res.status(200).send(expense);
  }

  static async update(req, res) {
    const id = req.params.id;
    const { title, amount, category, date, description } = req.body;

    if (!ExpenseController.existsExpense(id)) {
      res.status(404).send("No expense found.");
    }

    const expense = await ExpenseController.update({
      id,
      title,
      amount,
      category,
      date,
      description,
    });

    res.status(200).send(expense);
  }

  static async getAll(req, res) {
    const expenses = await ExpenseController.getAll();

    if (!expenses) {
      res.status(404).send("There aren't any expenses");
    }

    res.status(200).send(expenses);
  }

  static async getById(req, res) {
    const id = req.params.id;
    const expense = await ExpenseController.getById(id);

    await console.info("EXPENSE FULL: ", expense);

    if (!expense) {
      res.status(404).send("No expense found.");
    }

    res.status(200).send(expense);
  }

  static async delete(req, res) {
    const id = req.params.id;
    const expense = await ExpenseController.getById(id);

    if (!expense) {
      res.status(404).send("No expense found.");
    }

    await ExpenseController.delete(id);

    res.status(204).end();
  }
}

export default ExpenseView;
