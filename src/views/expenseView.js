import ExpenseController from "../controllers/expenseController.js";

const STATUS_VALUES = ["PENDENTE", "PAGA"];

const isValidStatus = (status) =>
  status == null || STATUS_VALUES.includes(status);

class ExpenseView {
  static async create(req, res) {
    const { description, amount, date, status, categoryId } = req.body;

    if (!description || !amount || !categoryId || !date) {
      return res.status(400).send("All fields are required!");
    }

    if (!isValidStatus(status)) {
      return res.status(400).send("Status must be 'PENDENTE' or 'PAGA'.");
    }

    try {
      const expense = await ExpenseController.create({
        description,
        amount,
        date,
        status,
        categoryId,
        userId: req.user.id,
      });

      res.status(201).send(expense);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async updateAllFields(req, res) {
    const id = req.params.id;
    const { description, amount, date, status, categoryId } = req.body;

    try {
      const expense = await ExpenseController.update({
        id,
        description,
        amount,
        status,
        categoryId,
        date,
        userId: req.user.id,
      });

      if (!expense) {
        return res.status(404).send("No expense found.");
      }

      res.status(200).send(expense);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    const { description, amount, date, status, categoryId } = req.body;

    try {
      const expense = await ExpenseController.update({
        id,
        description,
        amount,
        status,
        categoryId,
        date,
        userId: req.user.id,
      });

      if (!expense) {
        return res.status(404).send("No expense found.");
      }

      res.status(200).send(expense);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async getAll(req, res) {
    try {
      const expenses = await ExpenseController.getAll({ userId: req.user.id });

      if (!expenses) {
        return res.status(404).send("There aren't any expenses");
      }

      res.status(200).send(expenses);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getById(req, res) {
    const id = req.params.id;

    try {
      const expense = await ExpenseController.getById({
        id,
        userId: req.user.id,
      });

      if (!expense) {
        return res.status(404).send("No expense found.");
      }

      res.status(200).send(expense);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async delete(req, res) {
    const id = req.params.id;

    try {
      const expense = await ExpenseController.getById({
        id,
        userId: req.user.id,
      });

      if (!expense) {
        return res.status(404).send("No expense found.");
      }

      await ExpenseController.delete({ id, userId: req.user.id });
      res.status(204).end();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default ExpenseView;
