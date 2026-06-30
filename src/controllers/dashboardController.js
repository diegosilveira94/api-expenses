import Expense from "../models/expenseModel.js";
import Category from "../models/categoryModel.js";
import { col, fn } from "sequelize";

class dashboardController {
  static async total({ userId }) {
    const total = await Expense.sum("amount", { where: { userId } });

    return total ?? 0;
  }

  static async quantity({ userId }) {
    const quantity = await Expense.count({ where: { userId } });

    return quantity;
  }

  static async expenseByCategory({ userId }) {
    const rows = await Expense.findAll({
      where: { userId },
      attributes: [[fn("SUM", col("amount")), "total"]],
      include: [{ model: Category, attributes: ["name"] }],
      group: ["Category.id", "Category.name"],
    });

    return rows.map((r) => ({
      category: r.Category.name,
      total: r.get("total"),
    }));
  }
}

export default dashboardController;
