import DashboardController from "../controllers/dashboardController.js";

class DashboardView {
  static async getTotalExpenses(req, res) {
    try {
      const total = await DashboardController.total({ userId: req.user.id });
      res.status(200).send({ total });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async getExpensesCount(req, res) {
    try {
      const count = await DashboardController.quantity({ userId: req.user.id });
      res.status(200).send({ count });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async getExpensesByCategory(req, res) {
    try {
      const expensesByCategory = await DashboardController.expenseByCategory({
        userId: req.user.id,
      });
      res.status(200).send(expensesByCategory);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

export default DashboardView;
